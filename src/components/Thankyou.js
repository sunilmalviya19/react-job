import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Col, Row, Container, Button, Spinner, Table} from 'react-bootstrap';
import { getOrderById } from "../actions";

class Thankyou extends Component {
    constructor(props, state) {
        super(props, state);
    this.state = {
      error: null,
      isLoaded: false,
      order_id: props.match.params.order_id,
      order : []
    }
  }

  getOrderData(){
   //var order_id = sessionStorage.getItem("order_id");
    var order_id = this.state.order_id;
   return getOrderById(order_id).then(result => {
        this.setState({ order: result, isLoaded: true })
        console.log(result)
    });
  }

  componentDidMount() {
    this.getOrderData();
  }

  render() {
    return (
      <div>
       
      
            <div style={{margin: 'auto',width: '50%',padding: '10px'}}>
              <p>ThankYou. Your order has been received.</p>
              <Table striped bordered hover className="table table-condensed">
              <tbody>
                <tr><th>Order ID:</th><td>{ this.state.order.id }</td></tr>
                <tr><th>Date:</th><td>{ this.state.order.date_created }</td></tr>
                <tr><th>Total:</th><td>{ this.state.order.total }</td></tr>
                <tr><th>Payment Method:</th><td>{ this.state.order.payment_method }</td></tr>
                </tbody>
                </Table>
             
              <h3>Order details</h3>
              <Table striped bordered hover className="table table-condensed">
              <tbody>
                <tr>
                  <th>Product</th>
                  <th>Total</th>
                </tr>
                { ( this.state.order.line_items ) ? this.state.order.line_items.map((val,index) =>(
                  <tr>
                    <th>  
                      { val.name + ' x ' + val.quantity}                
                    </th>
                    <td>{ val.total }</td>
                  </tr>
                )) : '' }
                <tr>
                  <th>Subtotal</th>
                  <td>{ this.state.order.total}</td>
                </tr>
                <tr>
                  <th>Payment Method</th>
                  <td>{ this.state.order.payment_method}</td>
                </tr>
                <tr>
                  <th>Total</th>
                  <td>{ this.state.order.total}</td>
                </tr>
                </tbody>
                </Table>
              <br/>
              <h3>Customer Details</h3>
              <Table striped bordered hover className="table table-condensed">
                  
                <tr>
                  <th>Billing Details</th>
                  <th>Shipping Details</th>
                </tr>
                <tr>
                  <td>
                    {(this.state.order.billing) ?
                    <Table striped bordered hover className="table">
                        <tr><td>{ this.state.order.billing.first_name +' '+ this.state.order.billing.last_name }</td></tr>
                        <tr><td>{ this.state.order.billing.company }</td></tr>
                        <tr><td>{ this.state.order.billing.address_1 +' '+ this.state.order.billing.address_2 }</td></tr>
                        <tr><td>{ this.state.order.billing.city +' '+ this.state.order.billing.state+' '+' '+this.state.order.billing.country+' '+this.state.order.billing.postcode }</td></tr>
                        <tr><td>{ this.state.order.billing.email + ' '+this.state.order.billing.phone }</td></tr>
                        </Table>
                  : ''}
                  </td>
                  <td>                    
                    {(this.state.order.shipping) ?
                    <Table striped bordered hover className="table">
                        
                        <tr><td>{ this.state.order.shipping.first_name +' '+ this.state.order.shipping.last_name }</td></tr>
                        <tr><td>{ this.state.order.shipping.company }</td></tr>
                        <tr><td>{ this.state.order.shipping.address_1 +' '+ this.state.order.shipping.address_2 }</td></tr>
                        <tr><td>{ this.state.order.shipping.city +' '+ this.state.order.shipping.state+' '+' '+this.state.order.shipping.country+' '+this.state.order.shipping.postcode }</td></tr>
                        </Table>
                  : ''}</td>
                </tr>
                </Table>
            </div>
      
       
      </div>
    );
  }
}
export default Thankyou