import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchCount as fetchProduct, Product } from './productAPI';

export interface ProductState {
  value: Product[];
  cache: Product[];
  cart: Product[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ProductState = {
  value: [],
  status: 'idle',
  cache: [],
  cart: [],
};

export const fetchProductAsync = createAsyncThunk(
  'counter/fetchProduct',
  async () => {
    const response = await fetchProduct();
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    filterName: (state, filterText) => {
      state.value = state.cache.filter((e) => {
        return e.name.toLowerCase().includes((filterText.payload as string).toLowerCase())
      });
    },
    filterCategory: (state, filterCategory) => {
      if(filterCategory.payload){
        state.value = state.cache.filter((e) => {
          return e.category === filterCategory.payload
        });
      } else {
        state.value = state.cache
      }
    },
    addToCart: (state, product) => {
      state.cart.push(product.payload)
    },
    removeFromCart: (state, index) => {
      state.cart.splice(index.payload, 1)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cache = action.payload
        state.value = action.payload;
      })
      .addCase(fetchProductAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export function currencyFormat(num: string) {
    return '$' + parseInt(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
    
export const { filterName, filterCategory, addToCart, removeFromCart, } = productSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;
export const selectCart = (state: RootState) => state.counter.cart;

export default productSlice.reducer;
