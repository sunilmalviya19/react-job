import React, { useState } from 'react';
import WooCommerce from './Api';
import {WooCommerceV3} from './Api';
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

export function getData(endpoint){
  var token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }

    return axios.get(cartRoot + endpoint, {
        headers: headers
      })
    .then(res => {
     return res;
    }).catch(err=>{
     return err;
    })  
}
const addToCart = ({ product_id, quantity, variation_id }) => {
    var req = {product_id:product_id,quantity:quantity,variation_id:variation_id}
    console.log(variation_id);
  postData('add-item', req);
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

const getCountry = () => {
  WooCommerceV3.getAsync('data/countries')
    .then(function(result) {
      var country_data = JSON.parse(result.toJSON().body);
      console.log(country_data);
       return country_data;
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

const processOrder = (formdta) => {
 //  console.log(formdta);
 // var line_items = {product_id:10445, quantity:1}
 //    let orderData = JSON.stringify({
 //        // we'll process payment in the next step so set to false
 //        set_paid: false,
 //        billing: formdta,
 //        line_items
 //    })
    const orderData = {
  payment_method: "bacs",
  payment_method_title: "Direct Bank Transfer",
  set_paid: true,
  billing: {
    first_name: "John",
    last_name: "Doe",
    address_1: "969 Market",
    address_2: "",
    city: "San Francisco",
    state: "CA",
    postcode: "94103",
    country: "US",
    email: "john.doe@example.com",
    phone: "(555) 555-5555"
  },
  shipping: {
    first_name: "John",
    last_name: "Doe",
    address_1: "969 Market",
    address_2: "",
    city: "San Francisco",
    state: "CA",
    postcode: "94103",
    country: "US"
  },
  line_items: [
    {
      product_id: 10445,
      quantity: 2
    }
  ],
  shipping_lines: [
    {
      method_id: "flat_rate",
      method_title: "Flat Rate",
      total: 10
    }
  ]
};
WooCommerce.postAsync("orders", orderData).then((data) => {
  console.log(JSON.parse(data.body).order);

})
   
}


  export { cartRoot, addToCart, removeFromCart, getCartTotals, qtychangeCart, getProductimage, processOrder, getCountry };


