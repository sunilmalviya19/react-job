import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }
 
  render() {
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
                  <Link to="/login">
                    Login
                  </Link>
                </li>
              </ul>
    </div>
    </header>
    )
  }
}
export default Header;