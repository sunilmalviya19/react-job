import React, {Component, Fragment, useState} from 'react';
import './App.css';
import Product from './components/Product';

import { Col, Row } from 'react-bootstrap';
import ProductSingle from './components/ProductSingle';
import CategoryPage from './components/CategoryPage';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Login from './components/Login';
import Cart from './components/Cart';


function App() {
  
  return (
    <Router>
    <Fragment>
      <div className="App">
      <h3 className="store_head">WooCommerce Store</h3>
      
          <Switch>
          <Route exact path="/" component={Product}/>
          <Route exact path="/login" component={Login}/>
           <Route exact path="/cart" component={Cart}/>
          <Route exact path="/product/:id" component={ProductSingle}/>
          <Route exact path="/category/:id" component={CategoryPage}/>
          </Switch>
      
        
      
    </div>
    </Fragment>
    </Router>
  );
}

export default App;
