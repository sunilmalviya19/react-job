import React, { Component } from "react";
import axios from 'axios';
import { Col, Row, Container, Button, Spinner, Table} from 'react-bootstrap';
import NumericInput from 'react-numeric-input';
import { cartRoot, removeFromCart, getCartTotals, qtychangeCart } from "../actions";
class Cart extends Component {
  constructor(props) {
    super(props);
   // this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
	  isLoaded:false,
    error: null,
    totals:{},
	  cart: []
    };
  }
  
  
  
   getAllCart(){
   	const that = this;
     var token = localStorage.getItem('token');

     var config = {
        data: {
          'thumb' : true
        },
         headers: {
                 'Content-Type':'application/json',
                 'Authorization': 'Bearer ' + token,
                },
                };

 return axios.get(cartRoot+'get-cart',config)
            .then(res => {
              //console.log(res);
		       that.setState({
		          isLoaded: true,
              cart: res.data,
            })
           
            return res.data;
           
            }).catch(err=>{
             console.log('xxxxxxxxx xxxxxxxxxxxxx error ' + err);
            })

   }

   qtyChanged(qty, key) {
    //qtychangeCart(qty, key);
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
     this.getAllCart();
     getCartTotals().then(result => {
      this.setState({ totals: result});
    });
   
	}

 

cartList(){
    return (
       Object.values(this.state.cart).map((item) => {
          return (
        <tr key={item.key} id="{item.product_id}">
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
					{item.line_total}
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
       </Container>
      </div>
    );
  }
}
export default Cart;