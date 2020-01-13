import React, { Component } from "react";
import { Col, Row, Container, Button, Form } from 'react-bootstrap';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import { getUserByEmail, getLocalcart, addToCart, signUp } from "../actions";
import Notifications, {notify} from 'react-notify-toast';
import WooCommerce from '../Api';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    error: null,
	  email: '',
    password: '',
    reguser: "",
    regpass: "",
    };
  }

  loginUser = () => {
 	
	//console.log(this.state.email);
	if (this.state.email) {
	var req = { username: this.state.email, password: this.state.password };
	var apiHost = WooCommerce.url+'/wp-json';
    fetch(apiHost + '/jwt-auth/v1/token', {
            method: "POST",
            body: JSON.stringify(req),
            headers: {'Content-Type':'application/json'},
        }).then((response) => response.json())
                .then((result) => {
			        if(result.token){
			        	console.log(result);
						localStorage.setItem("token", result.token);
            localStorage.setItem("user_email", result.user_email);
            this.userDetails(result.user_email);
              localStorage.setItem("display_name", result.user_display_name);
            this.setState({message: "User login successfully", redirectLogin: true});
            var cart = localStorage.getItem('cart_content');
         JSON.parse(cart).map((val,index) => {
          addToCart(val.product_id, val.quantity, val.variation_id)
          
          })
          localStorage.removeItem("cart_content");
          this.props.history.push("/");
					}
                   
                })
                .catch((error) => {
                    
                    console.error(error);
                });
	}

  }
handleChange(e){
  this.setState({[e.target.name]: e.target.value})
}
 shandleChange = (e) => {
	  e.preventDefault();
	  this.loginUser();
		
}

signuphandleChange = (e) => {
  e.preventDefault();
  this.registerUser();
  
}
userDetails(email) {
  return getUserByEmail(email).then(result => {
   
   // console.log(result);
    sessionStorage.setItem("user_id",result[0].id);
  })
}
registerUser(){
  let req = {
      username: this.state.reguser,
      email: this.state.email,
      password: this.state.regpass 
    }

    signUp(req).then(result => {
      let myColor = { background: 'green', text: "#FFFFFF", top: "150px" };
     // console.log(result)
      if(result.data.id )
      {
        this.setState({
          message1: "Register user successfully",
          redirectLogin: true
        });
        notify.show("Register user successfully please login", "custom", 5000, myColor);
      }
    });
}

    
  componentDidMount(){
    //this.loginUser();
   //this.registerUser();
  }

  
  render() {
  	//console.log(this.state.password);
    return (
      <div>
       <Container>
       <Row>
<Col xs={5}>
<h2>Login</h2>
       <Form onSubmit={this.shandleChange} className="login_box">
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control required type="email" placeholder="Enter email" name="email" onChange={(e) => this.handleChange(e)}/>
  </Form.Group>
  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control required type="password" name="password" placeholder="Password"  onChange={(e) => this.handleChange(e)}/>
  </Form.Group>
  <Button variant="primary" type="submit" >
    Login
  </Button>
</Form> 
</Col>
<Col xs={1}>
<h2 className="or">OR</h2>
</Col>
<Col xs={6}>
<h2>New User Signup!</h2>
<Form onSubmit={this.signuphandleChange} className="signup-form">
<Form.Group >
    <Form.Label>Name</Form.Label>
    <Form.Control required type="text" placeholder="username" name="reguser" onChange={(e) => this.handleChange(e)}/>
  </Form.Group>
  <Form.Group >
    <Form.Label>Email address</Form.Label>
    <Form.Control required type="email" placeholder="Enter email" name="email" onChange={(e) => this.handleChange(e)}/>
  </Form.Group>
  <Form.Group >
    <Form.Label>Password</Form.Label>
    <Form.Control required type="password" name="regpass" placeholder="Password"  onChange={(e) => this.handleChange(e)}/>
  </Form.Group>
  <Button variant="primary" type="submit" >
  Signup
  </Button>
</Form> 
</Col>
</Row>
       </Container>
       </div>
    );
  }
}
export default Login;