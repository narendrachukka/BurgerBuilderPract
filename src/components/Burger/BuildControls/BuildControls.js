import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl'



const controls = [
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'}
]

const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Total Price : {props.totalPrice.toFixed(2)}</p>
            {controls.map((control)=>{
                return <BuildControl label={control.label} add={()=>props.addIngredient(control.type)} 
                remove ={()=>props.removeIngredient(control.type)} disableInfo={props.disableInfo[control.type]} key = {control.label} /> ;
            })}
            <button className={classes.OrderButton} onClick = {props.purchase} disabled={!props.purchasable}>ORDER NOW</button>
        </div>
    );
}

export default BuildControls;