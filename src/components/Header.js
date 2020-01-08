import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Logout } from "../actions";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false
      
    };
  }
 
  render() {
    var token = localStorage.getItem('token');
    console.log(token);
    return (<header id="header">
    <div className="header_top">
    <ul className="menu">
                <li>
                  <Link to="/">
                    Home
                    </Link>
                </li>
                <li>
                <Link to="/cart">
                    Cart
                    </Link>
                </li>
               
                
                 <li>
                  { ( !token ) ?
                  <Link to="/login">
                    Login
                  </Link> : <Link onClick={ () => Logout() } to="/login">Logout</Link>
                  }
                </li>
              </ul>
    </div>
    </header>
    )
  }
}
export default Header;