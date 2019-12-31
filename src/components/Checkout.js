  import React, {Component, useState} from 'react';
  import { Col, Row, Container, Button, Form, Spinner } from 'react-bootstrap';
  import { getCountry, processOrder } from "../actions";
class Checkout extends Component {
     
 constructor(props, state) {
          super(props, state);
         // localStorage.clear();
         //console.log(getCountry());
          var user_email = localStorage.getItem('user_email');
            this.state = {
              isLoaded:false,
            email: user_email,
            countries: []
             }
          
        }

chekoutSunmit = (event) => {
event.preventDefault();
 var chekdata = {
    first_name:event.target.elements.fname.value,
    last_name:event.target.elements.lname.value,
    email:event.target.elements.email.value
}
processOrder(chekdata)
  // console.log(event.target.elements.email.value);
  // console.log(event.target.elements.fname.value);
  // console.log(event.target.elements.lname.value);
}


componentDidMount(){
   
      //this.setState({ countries:  getCountry()});
      getCountry().then(result => {
        // console.log(result)
        this.setState({ countries: result, isLoaded: true });
    });
}
    render() {
        console.log(this.state.countries);
        const { email} = this.state;
        
        return (

             <Container className="checkout_wrap">
             <h2>Checkout</h2>
            
            <Row>
             
                <Col>
 <Form onSubmit={this.chekoutSunmit}>
      <Form.Row>
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
             name="fname"
            placeholder="First name"
            
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
             name="lname"
            placeholder="Last name"
            
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
         <Form.Group as={Col} md="12" controlId="validationCustom03">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
             name="email"
            placeholder="Email"
            defaultValue={email}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
         </Form.Row>
         <Form.Group controlId="formControlsSelect">
              <Form.Label>Country</Form.Label>
              <Form.Control as="select"  name="country">
              <option>Choose...</option>
             
              </Form.Control>
        </Form.Group>
         <Form.Group controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control placeholder="1234 Main St" />
  </Form.Group>

  <Form.Group controlId="formGridAddress2">
    <Form.Label>Address 2</Form.Label>
    <Form.Control placeholder="Apartment, studio, or floor" />
  </Form.Group>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>City</Form.Label>
      <Form.Control />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>State</Form.Label>
      <Form.Control as="select">
        <option>Choose...</option>
        <option>...</option>
      </Form.Control>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Zip</Form.Label>
      <Form.Control />
    </Form.Group>
  </Form.Row>

  <Form.Group id="formGridCheckbox">
    <Form.Check type="checkbox" label="Agree to terms and conditions" />
  </Form.Group>
      <Button variant="secondary" type="submit" className="place_ordr_btn">Place Order</Button>
    </Form>
                 

                </Col>

                
            </Row>
            </Container>
        );
    }
}

export default Checkout;