import React, { Component } from "react";
import axios from 'axios';
import { Col, Row, Container, Button, Spinner, Table} from 'react-bootstrap';
import NumericInput from 'react-numeric-input';
import { cartRoot, removeFromCart, getCartContent, getCartTotals, qtychangeCart, getProductimage, getData, getLocalcart } from "../actions";
class Cart extends Component {
  constructor(props) {
    super(props);
   // this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      cart: [],
	  isLoaded:false,
    error: null,
    totals:[]
	  
    };
  }
  
  
  
  getAllCart(){
   
    return getCartContent().then(res => {
          this.setState({
             isLoaded: true,
             cart: res,
           })
           return res;
           })
    
  }


   qtyChanged(qty, key) {
    qtychangeCart(qty, key).then(result => {
      this.getAllCart().then(result => {
          this.setState({ cart: result, isLoaded: true });
      });
      getCartTotals().then(result => {
        this.setState({ totals: result});
      });
    });
  }

  removeitem(key) {
    removeFromCart(key).then(result => {
      this.getAllCart().then(result => {
          this.setState({ cart: result, isLoaded: true });
      });
      getCartTotals().then(result => {
        this.setState({ totals: result});
      });
    
    });
  }
  
	componentDidMount(){
     var token = localStorage.getItem('token');
    if( token )
    {
     this.getAllCart();
        getCartTotals().then(result => {
        this.setState({ totals: result});
       });
   } else{
      getLocalcart().then(result => {
        this.setState({ cart: result, isLoaded: true });
       
      });
      getCartTotals().then(result => {
        this.setState({ totals: result});
       });
      
    }
	}

 

cartList(){
if (this.state.isLoaded) {
    return (
       Object.values(this.state.cart).map((item) => {
          return (
        <tr key={item.product_id} id="{item.product_id}">
          <td className="cart_product">
           
           
			</td>
      <td className="cart_product">
      {item.product_name}
			</td>	
      <td className="cart_product">
      {item.product_price}
			</td>	
      <td className="cart_product">
      <Button variant="info" onClick={() => {
         this.qtyChanged(item.quantity-1, item.key)
    }}>-</Button>
     
					{item.quantity}
          <Button variant="info" onClick={() => {
         this.qtyChanged(item.quantity+1, item.key)
    }}>+</Button>
     
			</td>	
      <td className="cart_product">
					{item.line_subtotal}
			</td>	

       <td className="cart_product">
       <Button variant="danger" onClick={() => {
         this.removeitem(item.key)
    }}>X</Button>
			</td>					
		</tr>
             
             );
      })    
    )
   }
  }


  cartTotals(){
   
      return (
        <div className="total_box"> 
        <Row>
        <Col xs={3}>
            <h5>Subtotal</h5>
            </Col>
            <Col xs={9}>
            {this.state.totals.subtotal}
            </Col>
            <Col xs={3}>
            <h5>Total</h5>
            </Col>
            <Col xs={9}>
            {this.state.totals.cart_contents_total}
            </Col>
        </Row>        
      </div> 
        )
       
  }
  



  render() {
   
	  if (!this.state.isLoaded) {
            return (
               <Spinner animation="border" variant="primary" />
            );
         }
          console.log(this.state.cart);
    return (
      <div>
        <Container>
		<div className="table-responsive cart_info">
					<Table striped bordered hover className="table table-condensed">
						<thead>
							<tr className="cart_menu">
								<td className="image">Item</td>
								<td className="name">Name</td>
								<td className="price">Price</td>
								<td className="quantity">Quantity</td>
								<td className="total">Total</td>
								<td></td>
							</tr>
						</thead>
						<tbody>
							{this.cartList()}
             
						</tbody>
					</Table>
				</div>
        {this.cartTotals()}
        <Button variant="primary" className="checkout_btn" size="lg" href={`/checkout`}>Checkout</Button>
       </Container>
      </div>
    );
  }
}
export default Cart;