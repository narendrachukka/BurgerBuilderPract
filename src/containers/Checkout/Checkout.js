import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom'
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux'

class Checkout extends Component {
    
    checkoutCancelHandler=()=>{
        console.log(this.props);
        this.props.history.goBack();
    }
    checkoutContinueHandler = ()=>{
        this.props.history.push('/checkout/contact-data')
    }
    render() {
        return (
           <div>
               <CheckoutSummary ingredients={this.props.ings}
               checkCancel={this.checkoutCancelHandler}
               checkContinue = {this.checkoutContinueHandler}
               ></CheckoutSummary>
               <Route path={this.props.match.path+'/contact-data'} component = {ContactData}></Route>
           </div> 
        );
    }
}
const mapStateToProps = state => {
    return {
        ings : state.ingredients,
        price : state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);