import React, { Component } from "react";
import { Col, Row, Container, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import WooCommerce from '../Api';
class Login extends Component {
  constructor(props) {
    super(props);
       //this.shandleChange = this.shandleChange.bind(this);
    this.state = {
      error: null,
	  email: '',
	  password: '',
    };
  }


  loginUser = () => {
 	
	console.log(this.state.email);
	if (this.state.email) {
	var req = { username: this.state.email, password: this.state.password };
	var apiHost = 'http://veronica.codingkloud.com/wp-json';
    fetch(apiHost + '/jwt-auth/v1/token', {
            method: "POST",
            body: JSON.stringify(req),
            headers: {'Content-Type':'application/json'},
        }).then((response) => response.json())
                .then((result) => {
			        if(result.token){
			        	console.log(result.token);
						localStorage.setItem("token", result.token);
						localStorage.setItem("display_name", result.user_display_name);
						this.setState({message: "User login successfully", redirectLogin: true});

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
    
  componentDidMount(){
    this.loginUser();
  }

  
  render() {
  	//console.log(this.state.password);
    return (
      <div>
       <Container>
       <Form onSubmit={this.shandleChange}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e) => this.handleChange(e)}/>
  </Form.Group>
  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" name="password" placeholder="Password"  onChange={(e) => this.handleChange(e)}/>
  </Form.Group>
  <Button variant="primary" type="submit" >
    Submit
  </Button>
</Form>
      
       </Container>
       </div>
    );
  }
}
export default Login;