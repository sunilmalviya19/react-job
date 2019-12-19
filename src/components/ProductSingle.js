import React, { Component } from 'react';
import { Col, Row, Container, Button, Spinner } from 'react-bootstrap';
import WooCommerce from '../Api';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

 class ProductSingle extends Component {
       constructor({ match :{ params :{id} } }) {
          super();
          this.state = {
             error: null,
             isLoaded: false,
             product_data: {},
             product_id: id
            
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

  componentDidMount(){
    this.getData();
  }

  
  render () {
   
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
									
									
                                    <Button variant="outline-primary" className="add_to_cart_btn">Add to cart</Button>
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