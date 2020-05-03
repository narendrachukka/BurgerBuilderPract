import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom'
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        price : 0
    }
    checkoutCancelHandler=()=>{
        console.log(this.props);
        this.props.history.goBack();
    }
    checkoutContinueHandler = ()=>{
        this.props.history.push('/checkout/contact-data')
    }
    UNSAFE_componentWillMount= ()=>{
        let urlParams = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        let price = 0;
        for (let params of urlParams.entries() ){
            if(params[0]==='price'){
                price = params[1];
            }else{
                ingredients[params[0]]= +params[1];
            }
        }
        console.log(ingredients);
        console.log(price);
        this.setState({ingredients:ingredients,price:price});
    }
    render() {
        return (
           <div>
               <CheckoutSummary ingredients={this.state.ingredients}
               checkCancel={this.checkoutCancelHandler}
               checkContinue = {this.checkoutContinueHandler}
               ></CheckoutSummary>
               <Route path={this.props.match.path+'/contact-data'} render={()=><ContactData ingredients={this.state.ingredients} price = {this.state.price}/>}></Route>
           </div> 
        );
    }
}

export default Checkout;