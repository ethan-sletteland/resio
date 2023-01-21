import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch, useInterval } from '../../app/hooks';
import {
  currencyFormat,
  fetchProductAsync,
  filterCategory,
  filterName,
  removeFromCart,
  selectCart,
  selectCount,
} from './productSlice';
import styles from './Product.module.css';
import { Card } from './Card';
import { Product } from './productAPI';
import { Badge, Button, ButtonGroup, Drawer, IconButton, List, ListItem, ListItemText, TextField } from '@mui/material';
import { ShoppingCart, Delete } from '@mui/icons-material'

export function ProductGallery() {
  const products: Product[] = useAppSelector(selectCount);
  const cart: Product[] = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  const pollTime = 10000

  const categories = [...new Set(products.map((e) => e.category))]
  
  // initial load
  useEffect(() => { dispatch(fetchProductAsync()) }, [dispatch])
  // and let's short-poll (WebSockets would be better)
  // in real life we'de want to add some logic to the reducer to
  // make appending to and editing from the products array 
  // less jarring to the user.
  useInterval(() => {
    dispatch(fetchProductAsync())
    console.log(`polling at ${Date.now()}`)
  }, pollTime);

  const [cartOpen, setCartOpen] = useState(false);
  function toggleDrawer() {
    setCartOpen(!cartOpen)
  }

  return (
    <div>
      <div className={styles.toolbar}>
        <TextField
          id="text-filter"
          label="Filter by Text"
          variant="outlined"
          onKeyUp={(e) => dispatch(filterName((e.target as HTMLInputElement).value))} />
        
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          {categories.map((e, i) => <React.Fragment>
            <Button
              className={styles.button}
              aria-label="Decrement value"
              key={i}
              onClick={() => dispatch(filterCategory(e))}
            >{e}</Button>
          </React.Fragment>)}

          {(categories.length === 1)
            ? <Button onClick={() => dispatch(filterCategory(null))}>X</Button>
            : null
          }
        </ButtonGroup>
        
        <IconButton aria-label="cart" onClick={toggleDrawer}>
          <Badge badgeContent={cart.length} color="primary">
            <ShoppingCart color="action" />
          </Badge>
        </IconButton>

        <React.Fragment>
          <Drawer
            anchor='right'
            open={cartOpen}
            onClose={toggleDrawer}
          >
            
            <List dense={false}>
              {cart.map((p, i) => 
                <ListItem
                  key={`${i}-item`}
                  secondaryAction={
                    <IconButton
                      onClick={() => dispatch(removeFromCart(i))}
                      edge="end"
                      aria-label="delete">
                      <Delete />
                    </IconButton>
                  }
                >
                <ListItemText
                  key={`${i}-text`}
                  primary={p.name}
                  secondary={currencyFormat(p.price)}
                />
                </ListItem>
              )}

              {(cart.length) ? null : <p className={styles.emptyText}>Nothing in your cart!</p>}

          </List>
          </Drawer>
        </React.Fragment>
      </div>
      <div className={styles.row}>
        { products.map((e: Product, i: number) => {
          return <Card key={i} product={e} />
        })}
        
        {(products.length === 0) ? <div>No Results!</div> : null}
        
      </div>
    </div>
  );
}
