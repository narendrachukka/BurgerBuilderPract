import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import {connect} from 'react-redux'
import * as actionTypes from '../../store/actions'

class BurgerBuilder extends Component {
    state = {
        totalPrice : 4,
        purchasable : false,
        purchasing : false,
        loading : false

    };
    componentDidMount(){
        // axios.get('/ingredients.json').then((response)=>{
        //     this.setState({ingredients:response.data})
        // }).catch((error)=>console.log(error));
    }
    updatePurchaseState = (ingredients)=>{
        ingredients = {
            ...ingredients
        };
        const sum = Object.keys(ingredients).map((igKey)=>{
            return ingredients[igKey]
        }).reduce((sum,el)=>sum+el,0);

        return sum>0;
    }

    purchaseHandler = ()=> this.setState({purchasing:true});
    purchaseCancelHadler = ()=> this.setState({purchasing:false});
    purchaseContinueHandler = ()=>{
        this.props.history.push('/checkout');
    }
    render() {
        const disabledInfo = {...this.props.ings};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }
        let burger = <Spinner></Spinner>;
        let orderSummary = <Spinner></Spinner>;
        if(this.props.ings){
            burger = <Aux>
                            <Burger ingredients = {this.props.ings}></Burger>
                            <BuildControls addIngredient = {this.props.onIngredientAdd}
                            removeIngredient = {this.props.onIngredientRemoved}
                            disableInfo = {disabledInfo}
                            totalPrice = {this.props.price}
                            purchasable={this.updatePurchaseState(this.props.ings)}
                            purchase = {this.purchaseHandler}></BuildControls>
                    </Aux>; 
            if(!this.state.loading){
                orderSummary = <OrderSummary price = {this.props.price} ingredients = {this.props.ings} purchaseCancelled = {this.purchaseCancelHadler} purchaseContinued = {this.purchaseContinueHandler}/>
            }
        }
        return (
            <Aux>
                <Modal show = {this.state.purchasing} modalClose = {this.purchaseCancelHadler}>
                    {orderSummary}
                </Modal>
                {burger}  
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings : state.ingredients,
        price : state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd : (igName)=> dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName : igName}),
        onIngredientRemoved : (igName)=> dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName : igName})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(BurgerBuilder,axios));