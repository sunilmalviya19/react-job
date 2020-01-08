import React, { useState } from 'react';
import WooCommerce from './Api';
import {WooCommerceV3} from './Api';
import axios from 'axios';
import Notifications, {notify} from 'react-notify-toast';
const cartRoot = WooCommerce.url;
const cart_content = [];
export function postData(endpoint, request_data, token){
     //var token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }

    return axios.post(cartRoot + endpoint, request_data , {
        headers: headers
      })
    .then(res => {
     return res;
    }).catch(err=>{
     return err;
    })  
   
}
export const Logout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("user_email");
    localStorage.removeItem("display_name");
    
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
const addToCart = ( product_id, quantity, variation_id ) => {
  var token = localStorage.getItem('token');
  if( !quantity )
    {
        quantity = 1;
    }

    if(variation_id){
         var req = {product_id:product_id,quantity:quantity,variation_id:variation_id}
    }
    else{
        var req = {product_id:product_id,quantity:quantity}
    }
    let myColor = { background: 'green', text: "#FFFFFF", top: "20px" };
    
  
       if( token )
        {
                postData('/wp-json/cocart/v1/add-item', req, token).then(result => {
                   notify.show("Added to cart", "custom", 5000, myColor);
                });
        }
        else{

            cart_content.push(req);
            //console.log(cart_content);
            localStorage.setItem("cart_content",JSON.stringify(cart_content));
             notify.show("Added to cart", "custom", 5000, myColor);
        }
        
       
  }


  const removeFromCart = (cart_item_key) => {
    var token = localStorage.getItem('token');
    console.log(cart_item_key);
    const headers = {
        'Authorization': 'Bearer ' + token
      }
      var req = {cart_item_key:cart_item_key}
    return axios.delete(cartRoot +'/wp-json/cocart/v1/item',{ data: { cart_item_key: cart_item_key },
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
      //console.log(product_data.images[0].src);
        return product_data.images[0].src;
      })
}

const getCountry = () => {
  return new Promise((resolve, reject) => {
    WooCommerceV3.getAsync("data/countries").then(function(result) {
        resolve(JSON.parse(result.toJSON().body));
    })
    });
}

export const getAllStates = (id) => {
  return new Promise((resolve, reject) => {
  WooCommerceV3.getAsync("data/countries/"+id).then(function(result) {
      resolve(JSON.parse(result.toJSON().body));
  })
  });
}
const getCartContent  = () => {
    var token = localStorage.getItem('token');
    var config = {
        headers: {
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + token,
               }
               };
  return axios.get(cartRoot +'/wp-json/cocart/v1/get-cart',config)
    .then(res => {
      //console.log(res.data);
      return res.data;
    }).catch(err=>{
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
  return axios.get(cartRoot +'/wp-json/cocart/v1/totals',config)
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
  return axios.post(cartRoot +'/wp-json/cocart/v1/item', req, {
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

const getAdminToken = () => {
    var req = { username: 'admin', password: 'test123G' };
  var apiHost = WooCommerce.url+'/wp-json';
    fetch(apiHost + '/jwt-auth/v1/token', {
            method: "POST",
            body: JSON.stringify(req),
            headers: {'Content-Type':'application/json'},
        }).then((response) => response.json())
                .then((result) => {
              if(result.token){
                //console.log(result);
                return result.token;
              }
                   
               }).catch((error) => {
                  console.error(error);
                });
   
  }


const processOrder = (orderData) => {
  
 
 console.log(orderData);


   
}

export const getProduct = (id) => {
    return new Promise((resolve, reject) => {
        WooCommerce.getAsync('products/'+id).then(function(result) {
            resolve(JSON.parse(result.toJSON().body));
        })
    });
}

 const getLocalcart = () => {
    var cart_content = [];
    var temp_obj = {};
    var cart = localStorage.getItem('cart_content');
    return new Promise((resolve, reject) => {
    JSON.parse(cart).map((val,index) => {
      getProduct(val.product_id).then(result => {
       temp_obj['product_id'] = result.id;
       temp_obj['variation_id'] = val.variation_id;
       temp_obj['quantity'] = val.quantity;
       temp_obj['product_name'] = result.name;
       temp_obj['product_price'] = result.price;
       temp_obj['line_subtotal'] = parseFloat( result.price ) * val.quantity;
       cart_content.push(temp_obj);
       temp_obj = {};
      })
    })
    resolve(cart_content);
    })
}
export const clearCart = () =>{
    var token = localStorage.getItem('token');
  
        return postData('/wp-json/cocart/v1/clear', '' , token).then((result) => {
           console.log(result);
           return result;
        })
   
}

  export { cartRoot, addToCart, removeFromCart, getCartTotals, qtychangeCart, getProductimage, processOrder, getCountry, getCartContent, getLocalcart };


