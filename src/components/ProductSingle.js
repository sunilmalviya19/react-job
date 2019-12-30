import React, { Component, useState } from 'react';
import { Col, Row, Container, Button, Spinner } from 'react-bootstrap';
import WooCommerce from '../Api';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import { addToCart } from "../actions";


 class ProductSingle extends Component {
       constructor(props, state) {
          super(props, state);
          this.state = {
             error: null,
             isLoaded: false,
             product_data: {},
             product_id: props.match.params.id,
             matchArr: [],
             tempArr: []
            
          }
    
         
        }

  getData(){
     const that = this;
     var p_id = this.state.product_id;
    
    WooCommerce.getAsync('products/'+p_id)
    .then(function(result) {
      that.setState({
          isLoaded: true,
          product_data: JSON.parse(result.toJSON().body),
        })
            
      })
  }
   matchVariations = ( slug , label ) => {
      
    if( !this.state.matchArr.includes(slug) ){
        this.state.matchArr[label] = slug
    }
    if( !slug ){
        delete this.state.matchArr[label];
    }
    const unordered = Object.assign({}, this.state.matchArr)
    const ordered = {};
    Object.keys(unordered).sort().forEach(function(key) {
    ordered[key] = unordered[key];
    });
    this.getVariationId(ordered);
  }
  getVariationId = ( variations ) => {
    var length = this.state.product_data.attributes.length;
    this.state.product_data.variations.map((val,index) => {
        var variation_id = val.id;
        var price = val.price;
        val.attributes.map((val1,index1)=>{
            var label =  val1.name
            var slug = val1.option
            if( !this.state.tempArr.includes(slug) ){
                this.state.tempArr[label] = slug
            }
            if( !slug)
            {
                delete this.state.tempArr[label];
            }
        })
        const unordered1 = Object.assign({}, this.state.tempArr)
        const ordered1 = {};
        Object.keys(unordered1).sort().forEach(function(key) {
        ordered1[key] = unordered1[key];
        });
        if( length == Object.keys(variations).length )
        {
            if( JSON.stringify(variations) === JSON.stringify(ordered1) )
            {
                this.setState({
                    variation_id: variation_id,
                    variation_price: price
                });
            }
        }
        else{
            this.setState({
                variation_id: '',
                variation_price: ''
            });
        }
        this.state.tempArr = [];
    }) 
  }

   handleChange = (key, value , label) => {
    var tempState = {}
    tempState[key] = value;
     
    this.setState(tempState);
    ( 'select' == key ) ? this.matchVariations(value,label) : this.matchVariations('')
  }


  componentDidMount(){
    this.getData();
  }

  
  render () {
      console.log(this.state.product_data);
   
      
    if (!this.state.isLoaded) {
        return (
           <Spinner animation="border" variant="primary" />
        );
     }
    
   
      
         return(
        <Container>
          <Row>

<Col xs={6}>
<img width="100%" alt="product" src={this.state.product_data.images[0].src} />
</Col>
<Col xs={6}>
<div className="product-wrap" key={this.state.product_data.id}>
								
								
								<h2 className="single_title">{this.state.product_data.name}</h2>
								
									<div className="s_price">${this.state.product_data.price}</div>

                  <div>
                     { this.state.product_data.attributes.map((val,index) => (
                                    <>
                                    <label >{val.name}</label>
                                    <select onChange={(e) => this.handleChange('select',e.target.value,val.name)} key={val.id}>
                                    <option value="">Select an option</option>
                                    {val.options.map((val1,index1) => (
                                    <option value={val1}>{val1}</option>
                                    ))}     
                                    </select>
                                    </>
                                ))
                                }
                  </div>
                 
        
    <Button variant="outline-primary" className="add_to_cart_btn" onClick={() => {
         addToCart({
            product_id: this.state.product_data.id,
            quantity: 1,
            variation_id: this.state.variation_id
        })
    }}
    disabled={this.state.product_data.type=='variable' && !this.state.variation_id}>Add to cart</Button>
                                <div dangerouslySetInnerHTML={{ __html: this.state.product_data.description}} />
                                    <div className="pro_description"> </div>
								
							</div>
</Col>
</Row>        
        
  </Container>
    )
               
    }
 }
export default ProductSingle;
