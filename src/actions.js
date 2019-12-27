import React, { useState } from 'react';
import WooCommerce from './Api';
import axios from 'axios';
const cartRoot = WooCommerce.url+'/wp-json/cocart/v1/';
export function postData(endpoint, request_data){
    var token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }

    return axios.post(cartRoot + endpoint, request_data , {
        headers: headers
      })
    .then(res => {
     return console.log(res);
    }).catch(err=>{
     return console.log(err);
    })  
   
}
const addToCart = ({ product_id, quantity }) => {
    var req = {product_id:product_id,quantity:quantity}
  // postData('add-item', req);
  //  let cart_products = [];
  //  if(localStorage.getItem('cart_products')){
  //   cart_products = JSON.parse(localStorage.getItem('cart_products'));
  //  }
  //  cart_products.push({'productId' : product_id + 1, quantity : quantity});
  //  localStorage.setItem('cart_products', JSON.stringify(cart_products));
  //  var carti = localStorage.getItem('cart_products');
  let productsString = localStorage.getItem('products')
  let products = []
  if(productsString){
      products = JSON.parse(productsString)
  } 
  products.concat([req])
  localStorage.setItem('products', JSON.stringify(products)) // set products as an array
      console.log(products);
  }


  const removeFromCart = (cart_item_key) => {
    var token = localStorage.getItem('token');
    console.log(cart_item_key);
    const headers = {
        'Authorization': 'Bearer ' + token
      }
      var req = {cart_item_key:cart_item_key}
    return axios.delete(cartRoot +'item',{ data: { cart_item_key: cart_item_key },
        headers: headers
      })
    .then(res => {
    console.log(res);
       return res;
    }).catch(err=>{
     console.log(err);
        return err;
    })  
}

const getCartTotals = () => {
    var token = localStorage.getItem('token');
    var config = {
        headers: {
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + token,
               }
               };
  return axios.get(cartRoot +'totals',config)
    .then(res => {
      //console.log(res.data);
      return res.data;
    }).catch(err=>{
      return err;
    })  
}


const qtychangeCart = (qty, cart_item_key) => {
  var token = localStorage.getItem('token');
  //console.log(cart_item_key);
  const headers = {
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + token
    }
  var req = {cart_item_key:cart_item_key, quantity:qty, refresh_totals: true}
  return axios.post(cartRoot +'item', req, {
      headers: headers
    })
  .then(res => {
    console.log(res);
    return res;
   
  }).catch(err=>{
    console.log(err);
    return err;
  })  
}


  export { cartRoot, addToCart, removeFromCart, getCartTotals, qtychangeCart };