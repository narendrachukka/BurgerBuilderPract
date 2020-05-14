import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

const purchaseBurgerSuccess = (id,orderData) => {
    return {
        type : actionTypes.PURCHASE_BURGER_SUCCESS,
        id : id,
        orderData : orderData
    }
};

const purchaseBurgerFail = (error) => {
    return {
        type : actionTypes.PURCHASE_BURGER_FAIL,
        error : error
    }
};
const purchaseBurgerStart = ()=>{
   return {
       type : actionTypes.PURCHASE_BURGER_START
   }
}

export const purchaseBurger = (orderData)=>{
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json',orderData).then((response)=>{
            dispatch(purchaseBurgerSuccess(response.data.name,orderData));
        }).catch(error=> purchaseBurgerFail(error));
    }
}

export const purchaseBurgerInit = ()=>{
    return {
        type : actionTypes.PURCHASE_BURGER_INIT
    }
}

const fetchOrderStart = ()=>{
    return {
        type : actionTypes.FETCH_ORDERS_START,
    }
}

const fetchOrderSuccess = (orders)=>{
    return {
        type : actionTypes.FETCH_ORDERS_SUCCESS,
        orders : orders
    }
}

const fetchOrderFail = () => {
    return {
        type : actionTypes.FETCH_ORDERS_FAIL
    }
}

export const fetchOrders = () => {
    return dispatch => {
         dispatch(fetchOrderStart());
         axios.get('/orders.json').then((res)=>{
             const fetchedOrders = [];
             for(let key in res.data){
                 fetchedOrders.push({
                     ...res.data[key],
                     id : key
                 })
             }
             dispatch(fetchOrderSuccess(fetchedOrders));
         }
         ).catch(err=>dispatch(fetchOrderFail()));
    }
}