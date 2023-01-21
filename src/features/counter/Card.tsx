import React, { Component } from 'react';
import { Product } from './productAPI';
import styles from './Card.module.css';
import { Button } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { useAppDispatch } from '../../app/hooks';
import {
  addToCart, currencyFormat,
} from './productSlice';

export function Card(props: {product: Product}) {

    const dispatch = useAppDispatch();

    return (
        <div className={`${styles.card} ${(props.product.hero)?styles.hero:''}`} >
            <img src={props.product.image} alt="" />
            <h2>{props.product.name}</h2>
            <h3>{props.product.category}</h3>
            <div>
                <Button
                    variant="contained"
                    startIcon={<AddShoppingCart />}
                    onClick={() => dispatch(addToCart(props.product))}
                >
                    Buy for {currencyFormat(props.product.price)}
                </Button>
            </div>
            <p>{ props.product.detail}</p>
        </div>
    )
}
