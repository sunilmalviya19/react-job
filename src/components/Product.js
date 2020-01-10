import React, { Component } from 'react';
import { Col, Row, Container, Button, Spinner, Pagination } from 'react-bootstrap';
import WooCommerce from '../Api';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import SideMenu from './SideMenu';
import axios from 'axios';

 class Product extends Component {
       constructor(props) {
          super(props);
           this.pageChanged = this.pageChanged.bind(this);
          this.state = {
             error: null,
             isLoaded: false,
             currentPage: 1,
             per_page_product: 20,
             total_items:null,
             category: [],
             items: []
            
          }
            
        }

     

     getData(page){
     const that = this;
    

      if (page) {
        var page = page;
       
     }else{
      var page = 1;
     }
    WooCommerce.getAsync('products?per_page='+that.state.per_page_product+'&page='+page)
     .then(function(result) {
      console.log(JSON.parse(result.toJSON().body));
      that.setState({
          isLoaded: true,
          total_items: result.headers['x-wp-total'],
          items: JSON.parse(result.toJSON().body),
        })
            
      })

      
     
  }
 
  
  componentDidMount(){
    this.getData();
   

  }

  

   pageChanged(e) {
    
    var pageno = e.target.text
    this.setState({ currentPage: pageno });
    this.getData(pageno);

  }
  productlist(){
    return (
        this.state.items.map((item) => {
          return (
              <Col key={item.id} xs={3} className="product_item"> <div key={item.id}>
               
                <img width="100%" alt="product" src={item.images[0].src} />
                <Link to={`/product/${item.id}`}><h4>{item.name}</h4></Link>
                <h6> ${item.price}</h6>
               
                 <Button variant="outline-primary" className="add_to_cart_btn" href={`/product/${item.id}`}>Buy Now</Button>
                
                  </div>
              </Col>
             
             );
            })    
    );
  }
  
//render  list
  render () {
      console.log(this.state.currentPage);
     
      const all_page = this.state.total_items / this.state.per_page_product;
      let active = this.state.currentPage;
      let Pitems = [];   
      //const indexOfLastTodo = this.state.currentPage * this.state.per_page_product;
     // const indexOfFirstTodo = indexOfLastTodo - this.state.per_page_product;
    //  const renderedProduct = this.state.items.slice(indexOfFirstTodo, indexOfLastTodo);
     
      for (let number = 1; number <= all_page; number++) {
        Pitems.push(
          
          <Pagination.Item key={number} active={number === active} onClick={this.pageChanged}>
            {number}
          </Pagination.Item>
          ,
         
        );
        
      }

const paginationBasic = (
  <div>
   
      <Pagination >{Pitems}</Pagination>
      
   
  </div>
);
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
        {this.productlist()}
        </Row>
</Col>
</Row>        

           <div className="page_cont">
           {paginationBasic}
          </div>  
            
          </Container>
    )
               
        }
    }

export default Product;