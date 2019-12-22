import React, {Component, Fragment} from 'react';
import WooCommerce from '../Api';
import { Col, Row } from 'react-bootstrap';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import CategoryPage from './CategoryPage';

class SideMenu extends Component {

    constructor(props, state) {
        super(props, state);
       
        this.state = {

            loading: false,
            categories: []

        };

    }

    getCatData(){
        const that = this;
       WooCommerce.getAsync('products/categories')
        .then(function(result) {
         // console.log(JSON.parse(result.toJSON().body));
       
        that.setState({
             loading: true,
             categories: JSON.parse(result.toJSON().body),
           })
               
         })
     }
   
     componentDidMount(){
       this.getCatData();
     }

     

     renderCategories = () => {
          return (
           
            <div className="sied_menu_link">
           
            {
              this.state.categories.map((category) => {
                  return ( 
                    
                         <Link to={`/category/${category.id}`} key={category.id}>
                          {category.name}
                         </Link>
                    
                     
                  );
              })
           }
           </div>      
               
          );
      }








    render() {

        return (
            <div>
 
               {this.renderCategories()}
            </div>
               


               
        );
    }
}

export default SideMenu;
