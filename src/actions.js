import React, { useState } from 'react';
import WooCommerce from './Api';
import axios from 'axios';
import Notifications, {notify} from 'react-notify-toast';
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
   postData('add-item', req).then(result => {
    let myColor = { background: 'green', text: "#FFFFFF", top: "20px" };
     notify.show("Added to cart", "custom", 5000, myColor);
   
  });
   
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

const getProductimage = (product_id) => {
  WooCommerce.getAsync('products/'+product_id)
    .then(function(result) {
      var product_data = JSON.parse(result.toJSON().body);
      console.log(product_data.images[0].src);
        return product_data.images[0].src;
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


  export { cartRoot, addToCart, removeFromCart, getCartTotals, qtychangeCart, getProductimage };