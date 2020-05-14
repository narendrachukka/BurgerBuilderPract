import * as actionTypes from '../actions/actionTypes';
import {updatedObject} from '../utility'


const intialState = {
    ingredients : null,
    totalPrice : 4,
    error : false
}

const INGREDIENT_PRICES = {
    salad : 0.4,
    meat : 0.7,
    cheese : 0.9,
    bacon : 1.4
};

const addIngredient = (state,action) => {
    const newIngredients = updatedObject(state.ingredients,{[action.ingredientName] : state.ingredients[action.ingredientName] + 1});
    return updatedObject(state,{ingredients:newIngredients,totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName]});
}

const removeIngredient = (state,action)=>{
    const newIngs = updatedObject(state.ingredients,{[action.ingredientName] : state.ingredients[action.ingredientName] - 1});
    return updatedObject(state,{ingredients:newIngs,totalPrice : state.totalPrice - INGREDIENT_PRICES[action.ingredientName]});
}

const setIngredients = (state,action) =>{
    return updatedObject(
        state,{ingredients : {
            salad : action.ingredients.salad,
            bacon : action.ingredients.bacon,
            meat  : action.ingredients.meat,
            cheese: action.ingredients.cheese
        },
        totalPrice : 4,
        error : false
    })
}

const fetchIngredientsFailed = (state)=>{
    return updatedObject(state,{error : true});
}

const reducer = (state=intialState,action)=>{
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT : return addIngredient(state,action);   
        case actionTypes.REMOVE_INGREDIENT : return removeIngredient(state,action);
        case actionTypes.SET_INGREDIENTS : return setIngredients(state,action);
        case actionTypes.FETCH_INGREDIENTS_FAILED : return fetchIngredientsFailed(state);
        default : return state;
    }
};

export default reducer;