import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';


class Orders extends Component {
    
     componentDidMount=()=>{
         this.props.onFetchOrders();
     }
    render() {
        let orders = <Spinner />
        if(!this.props.loading){
            orders = this.props.orders.map(order=>{
                return <Order key ={order.id} ingredients={order.ingredients} price={order.totalPrice}></Order>;
            })
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        orders : state.orders.orders,
        loading : state.orders.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders : ()=> dispatch(actions.fetchOrders())
    }
}
export default connect(mapStatetoProps,mapDispatchToProps)(withErrorHandler(Orders,axios));