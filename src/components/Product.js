import React, { Component } from 'react';
//import WooCommerceAPI from 'woocommerce-api';
import { Col, Row, Container, Button, Spinner } from 'react-bootstrap';
import WooCommerce from '../Api';


 class Product extends Component {
       constructor(props) {
          super(props);
          this.state = {
             error: null,
             isLoaded: false,
             currentPage: 1,
             category: [],
             items: {}
            
          }
        }

  getData(){
     const that = this;
    WooCommerce.getAsync('products?per_page=36')
     .then(function(result) {
      that.setState({
          isLoaded: true,
          items: JSON.parse(result.toJSON().body),
        })
            
      })
  }

  componentDidMount(){
    this.getData();
  }

  productlist(){
    return Object.entries(this.state.items).map(([key, value], i) => {

      return (
        
        
              <Col key={key} xs={3} className="product_item"> <div key={key}>
                <img width="100%" alt="product" src={value.images[0].src} />
                <h4>{value.name}</h4>
                <h6> ${value.price}</h6>
                 <Button variant="outline-primary" className="add_to_cart_btn">Add to cart</Button>
              
                  </div>
              </Col>
             
          
                 
           
      )
    })
  }
  
//render  list
  render () {
         
        // console.log(this.state);
         if (!this.state.isLoaded) {
            return (
               <Spinner animation="border" variant="primary" />
            );
         }
                  return(
        <Container>
        <h3 className="store_head">WooCommerce Store</h3>
             <Row>
        {this.productlist()}
        </Row>
            
          </Container>
    )
               
        }
    }

export default Product;