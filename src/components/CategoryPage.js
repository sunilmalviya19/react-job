import React, {Component} from 'react';
import { Col, Row, Container, Button, Spinner } from 'react-bootstrap';
import WooCommerce from '../Api';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import SideMenu from './SideMenu';
import Pagination from './Pagination';
class CategoryPage extends Component 
{
  constructor(props, state) {
   // console.log(props);
   
    super(props, state);
    this.pageChanged = this.pageChanged.bind(this);
    this.state = {
    error: null,
	  isLoaded: false,
    cat_id : props.match.params.id,
    currentPage: 1,
    per_page_product: 8,
    total_items:null,
    total_pages:null,
    items: {}
    };
  }
  componentWillReceiveProps(newProps){
    var categoryId = newProps.match.params.id;
    this.setState({cat_id:categoryId}, () => {
      this.getcatData();
    });
    
    }
  

  getcatData(page) {
    const that = this;
    if (page) {
      var page = page;
     
   }else{
    var page = 1;
   }
     var category_id = this.state.cat_id;
      WooCommerce.getAsync('products/?page='+page+'&per_page='+that.state.per_page_product+'&category='+category_id).then(function(result) {
        //console.log(result);
        that.setState({
          isLoaded: true,
          total_items: result.headers['x-wp-total'],
           total_pages: result.headers['x-wp-totalpages'],
          items: JSON.parse(result.toJSON().body)
        });
      });
    }
  
    

    componentDidMount() {
      this.getcatData();
      }
      pageChanged(e) {

        this.setState({ currentPage: e });
        this.getcatData(e);
    
      }
      catproductlist(){
        return (
            this.state.items.map((item) => {
              return (
                  <Col key={item.id} xs={3} className="product_item"> 

                  <div key={item.id}>
                   
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
    render() {
        
      //const all_page = this.state.total_items / this.state.per_page_product;
       const all_page = this.state.total_pages;
      let active = this.state.currentPage;
      let Pitems = [];   
     
    

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
           <div className="page_cont">
            <Pagination activePage={active} totalPages={all_page} handleSelect={ this.pageChanged }></Pagination>
          </div>  
        </Container>
      );
    }
  }
  export default CategoryPage;