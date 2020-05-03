import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'

const INGREDIENT_PRICES = {
    salad : 0.4,
    meat : 0.7,
    cheese : 0.9,
    bacon : 1.4
};
class BurgerBuilder extends Component {
    state = {
        ingredients : null,
        totalPrice : 4,
        purchasable : false,
        purchasing : false,
        loading : false

    };
    componentDidMount(){
        axios.get('/ingredients.json').then((response)=>{
            this.setState({ingredients:response.data})
        }).catch((error)=>console.log(error));
    }
    updatePurchaseState = (ingredients)=>{
        ingredients = {
            ...ingredients
        };
        const sum = Object.keys(ingredients).map((igKey)=>{
            return ingredients[igKey]
        }).reduce((sum,el)=>sum+el,0);

        this.setState({purchasable:sum>0});
    }
    addIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const updatedPrice = this.state.totalPrice + priceAddition;

        this.setState({totalPrice:updatedPrice,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);

    }
    removeIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount<=0){
            return;
        }
        const updatedCount = oldCount-1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeletion = INGREDIENT_PRICES[type];
        const updatedPrice = this.state.totalPrice - priceDeletion;

        this.setState({totalPrice:updatedPrice,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = ()=> this.setState({purchasing:true});
    purchaseCancelHadler = ()=> this.setState({purchasing:false});
    purchaseContinueHandler = ()=>{
        
        let queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+this.state.totalPrice);
        let queryParamsString=queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search:'?'+queryParamsString
        });
    }
    render() {
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }
        let burger = <Spinner></Spinner>;
        let orderSummary = <Spinner></Spinner>;
        if(this.state.ingredients){
            burger = <Aux>
                            <Burger ingredients = {this.state.ingredients}></Burger>
                            <BuildControls addIngredient = {this.addIngredientHandler}
                            removeIngredient = {this.removeIngredientHandler}
                            disableInfo = {disabledInfo}
                            totalPrice = {this.state.totalPrice}
                            purchasable={this.state.purchasable}
                            purchase = {this.purchaseHandler}></BuildControls>
                    </Aux>; 
            if(!this.state.loading){
                orderSummary = <OrderSummary price = {this.state.totalPrice} ingredients = {this.state.ingredients} purchaseCancelled = {this.purchaseCancelHadler} purchaseContinued = {this.purchaseContinueHandler}/>
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

export default WithErrorHandler(BurgerBuilder,axios);