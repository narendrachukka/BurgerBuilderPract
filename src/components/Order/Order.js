import React from 'react';
import classes from './Order.module.css';

const Order = (props) => {
    const ingredients = [];
    for(let ingredientName in props.ingredients){
        ingredients.push({name:ingredientName,amount:props.ingredients[ingredientName]});
    }
    let ingredientOutPut = ingredients.map(ig=>{
        return <span key = {ig.name}
            style={{
                textTransform:'capitalize',
                display :'inline-block',
                margin: '0 8px',
                border:'1px solid #ccc',
                padding:'5px'
            }}
            >{ig.name} ({ig.amount})</span>;
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients : {ingredientOutPut}</p>
            <p>Price : <strong>USD {props.price}</strong></p>
        </div>
    );
}

export default Order;