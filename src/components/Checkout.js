  import React, {Component, useState} from 'react';
  import { Col, Row, Container, Button, Form, Spinner, Table } from 'react-bootstrap';
  import { getCountry, getAllStates, getCartContent, getCartTotals, processOrder, clearCart, getLocalcart, getLocalTotals, paymentSubmit } from "../actions";
  import {Elements, StripeProvider} from 'react-stripe-elements';
  import Stripecard from './Stripecard';

class Checkout extends Component {
     
 constructor(props, state) {
          super(props, state);
          var user_email = localStorage.getItem('user_email');
            this.state = {
              isLoaded:false,
              cart: [],
              totals: [],
              countries: [],
              billing_states: [],
              billing_first_name: '',
              billing_last_name: '',
              billing_country: '',
              billing_address_1: '',
              billing_address_2: '',
              billing_city: '',
              billing_state: '',
              billing_postcode: '',
              billing_phone: '',
              billing_email: user_email,
              dataFromParent: {},
              stripetoken:{}
             }
        this.handleToken = this.handleToken.bind(this);
        }

handleToken = (stripetoken) => {
       //console.log(stripetoken);
  
        this.setState({ stripetoken });
 } 
  handleChange = e => {
    if( ('billing_country' == e.target.name ) && ( 'select' != e.target.value ) )
    {
      getAllStates(e.target.value).then(result => {
        this.setState({ billing_states: result.states });
      });
    }

    var state = {};
    state[e.target.name] =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState(state);
    }
 
 

chekoutSubmit = (event) => {
event.preventDefault();
var chekdata =  { 'billing' : {
    first_name : event.target.elements.billing_first_name.value,
    last_name : event.target.elements.billing_last_name.value,
    country : event.target.elements.billing_country.value,
    address_1 : event.target.elements.billing_address_1.value,
    address_2 : event.target.elements.billing_address_2.value,
    city : event.target.elements.billing_city.value,
    state : event.target.elements.billing_state.value,
    postcode : event.target.elements.billing_postcode.value,
    phone : event.target.elements.billing_phone.value,
    email : event.target.elements.billing_email.value
    }
  }

  chekdata['shipping'] = {
    first_name : event.target.elements.billing_first_name.value,
    last_name : event.target.elements.billing_last_name.value,
    country : event.target.elements.billing_country.value,
    address_1 : event.target.elements.billing_address_1.value,
    address_2 : event.target.elements.billing_address_2.value,
    city : event.target.elements.billing_city.value,
    state : event.target.elements.billing_state.value,
    postcode : event.target.elements.billing_postcode.value,
    email : event.target.elements.billing_email.value
    }
  var temp_items = [];
  Object.values(this.state.cart).map((item, i) => {
    var line_items = {};
    line_items['product_id'] = item.product_id
    line_items['variation_id'] = item.variation_id
    line_items['quantity'] = item.quantity
    temp_items.push(line_items)
  })
  
  chekdata['line_items'] = temp_items
  chekdata['payment_method'] = "stripe"
  chekdata['set_paid'] = false
  chekdata['shipping_lines'] = [{
    method_id: "free_shipping",
    method_title: "Free Shipping",
    total: "0"
    }]
  

 
    setTimeout(() => { 
     
        processOrder(chekdata).then(result => {
        console.log(result.data.id);
          if(result.data.id){
            if (this.state.stripetoken.id) {
                paymentSubmit(result.data.id, this.state.stripetoken.id).then(result => {
                   console.log(result);
                   
                });
            }
          
            var token = localStorage.getItem('token');
            if( token )
              {
                clearCart();
              }else{
                localStorage.removeItem("cart_content");
              }
            
            this.props.history.push(`/thankyou/${result.data.id}`);
          }

        });

      
      }, 700);


}


componentDidMount(){
  this.handleToken();
  var token = localStorage.getItem('token');
  if( token )
    {
      getCartContent().then(result => {
        this.setState({ cart: result, isLoaded: true });
    });

      getCartTotals().then(result => {

      this.setState({ totals: result, isLoaded: true });
    });
   } else{
      getLocalcart().then(result => {
        this.setState({ cart: result, isLoaded: true });
       
      });
     
       getLocalTotals().then(result => {
            // console.log(result)
              this.setState({ totals: result});
              });
    }
  
    
      getCountry().then(result => {
        // console.log(result)
        this.setState({ countries: result, isLoaded: true });
      });
        
}



ChekcartList(){
  
if (this.state.isLoaded) {
    return (
       Object.values(this.state.cart).map((item) => {
          return (
        <tr key={item.product_id} id="{item.product_id}">
          <td className="cart_product">
           <a href={`/product/${item.product_id}`}><img width="100px" alt="product" src={item.product_image} /></a>
           
      </td>
      <td className="cart_product">
      <a href={`/product/${item.product_id}`}><h4>{item.product_name}</h4></a>
      </td> 
      <td className="cart_product">
      {item.product_price}
      </td> 
      <td className="cart_product">
          {item.quantity}
      </td> 
      <td className="cart_product">
          {item.line_subtotal}
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
          {this.state.totals.total}
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
   console.log(this.state.dataFromParent)
        const { billing_email, cart, totals, countries, billing_country, billing_state} = this.state;
     
        return (

             <Container className="checkout_wrap">
             <h2>Checkout</h2>

            
            <Row>
             
                <Col>
                <div className="table-responsive cart_info">
          <Table striped bordered hover className="table table-condensed">
            <thead>
              <tr className="cart_menu">
                <td className="image">Item</td>
                <td className="name">Name</td>
                <td className="price">Price</td>
                <td className="quantity">Quantity</td>
                <td className="total">Total</td>
                
              </tr>
            </thead>
            <tbody>
              {this.ChekcartList()}
              
             
            </tbody>
          </Table>
          
        </div>
        {this.cartTotals()}
     
 <Form onSubmit={this.chekoutSubmit}>
      <Form.Row>
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            name="billing_first_name"
           
            placeholder="First name"
            
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
             name="billing_last_name"
             
            placeholder="Last name"
            
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
         <Form.Group as={Col} md="12" controlId="validationCustom03">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
             name="billing_email"
            placeholder="Email"
           
            defaultValue={billing_email}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

    <Form.Group as={Col} md="12" controlId="billing_phone">
      <Form.Label>Phone</Form.Label>
      <Form.Control 
         required
     type="text"
    name="billing_phone"
      />
    </Form.Group>
         </Form.Row>
         <Form.Group >
              <Form.Label>Country</Form.Label>
              <Form.Control as="select"  required name="billing_country" id="billing_country" value={this.state.billing_country} onChange={this.handleChange}>
              <option>Choose Country...</option>
              {countries.map((item, i) => (
								<option value={item.code} key={item.code}>{item.name}</option>
								))}
             
              </Form.Control>
        </Form.Group>
         <Form.Group controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control 
    required
     type="text"
    name="billing_address_1"
    
    placeholder="1234 Main St" />
  </Form.Group>

  <Form.Group controlId="formGridAddress2">
    <Form.Label>Address 2</Form.Label>
    <Form.Control 
     required
     type="text"
    name="billing_address_2"
   
    placeholder="Apartment, studio, or floor" />
  </Form.Group>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>City</Form.Label>
      <Form.Control 
         required
     type="text"
     
    name="billing_city"
      />
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>State</Form.Label>
      <Form.Control as="select" required name="billing_state" id="billing_state" value={this.state.billing_state} onChange={this.handleChange}>
      <option>-- State / Province / Region --</option>
									{ ( this.state.billing_country && 'select' != this.state.billing_country) ? this.state.billing_states.map((item, i) => (
									<option value={item.code} key={item.code}>{item.name}</option>
									)): '' }
      </Form.Control>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Zip</Form.Label>
      <Form.Control 
       required
     type="text"
     
    name="billing_postcode"
      />
    </Form.Group>
  </Form.Row>
   <StripeProvider apiKey="pk_test_mTfnMF6SGQgXESqMpvx6VCUp00uFl3rvnT">
        <div className="card_box">
        
          <Elements>
            <Stripecard handleToken={this.handleToken} data={this.state.dataFromParent} />
          </Elements>
        </div>
      </StripeProvider>
    
    
    </Form>
                 

                </Col>

                
            </Row>
            </Container>
        );
     
  }
}

export default Checkout;

