  import React, {Component, useState} from 'react';
  import { Col, Row, Container, Button, Form, InputGroup } from 'react-bootstrap';
  import { processOrder } from "../actions";
class Checkout extends Component {
     
 constructor(props, state) {
          super(props, state);
          var user_email = localStorage.getItem('user_email');
            this.state = {
            email: user_email,
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

    render() {
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
      <Button type="submit">Pay Now</Button>
    </Form>
                 

                </Col>

                
            </Row>
            </Container>
        );
    }
}

export default Checkout;