import React, {Component} from 'react';
import { Col, Row, Container, Button, Spinner } from 'react-bootstrap';
import WooCommerce from '../Api';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import SideMenu from './SideMenu';

class CategoryPage extends Component 
{
  constructor(props, state) {
    super(props, state);
    this.state = {
    error: null,
	  isLoaded: false,
	  cat_id : props.id,
    items: {}
    };
  }


  getcatData() {
    var category_id = this.state.cat_id;
    const that = this;
      WooCommerce.getAsync('products/?category='+category_id).then(function(result) {
        that.setState({
          isLoaded: true,
          items: JSON.parse(result.toJSON().body)
        });
      });
    }
    componentDidMount() {
      this.getcatData();
      }
    
      catproductlist(){
        return (
            this.state.items.map((item) => {
              return (
                  <Col key={item.id} xs={3} className="product_item"> <div key={item.id}>
                   
                    <img width="100%" alt="product" src={item.images[0].src} />
                    <Link to={`/product/${item.id}`}><h4>{item.name}</h4></Link>
                    <h6> ${item.price}</h6>
                   
                     <Button variant="outline-primary" className="add_to_cart_btn">Add to cart</Button>
                  
                      </div>
                  </Col>
                 
                 );
                })    
        );
      }
    render() {
      
        if (!this.state.isLoaded) {
          return (
             <Spinner animation="border" variant="primary" />
          );
        }
     return(
      <Container>
        <Row>
         <Col xs={3}>
           < SideMenu />
         </Col>
         <Col xs={9}>
         <Row>
          {this.catproductlist()}
      </Row>
      </Col>
       </Row>        
        </Container>
      );
    }
  }
  export default CategoryPage;