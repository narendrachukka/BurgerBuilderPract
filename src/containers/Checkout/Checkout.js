import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route,Redirect} from 'react-router-dom'
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
        let summary = <Redirect to='/' />
        if(this.props.ings){
            summary = (
                <div>
                    {this.props.purchased ? <Redirect to='/' /> : null}
                    <CheckoutSummary ingredients={this.props.ings}
                    checkCancel={this.checkoutCancelHandler}
                    checkContinue = {this.checkoutContinueHandler}
                    ></CheckoutSummary>
                    <Route path={this.props.match.path+'/contact-data'} component = {ContactData}></Route>
                </div> 
            )
        }
        return summary;
    }
}
const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        purchased : state.orders.purchased
    }
}


export default connect(mapStateToProps)(Checkout);