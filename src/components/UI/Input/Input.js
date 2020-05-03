import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
    let inputElement=null;
    let inputElementClasses = [classes.InputElement];
    if(props.invalid && props.validation && props.touched){
        inputElementClasses.push(classes.Invalid);
    }
    switch(props.elementType){
        case ('input'):
            inputElement = <input className={inputElementClasses.join(' ')} 
            {...props.elementConfig} 
            value={props.value}
            onChange={props.changed}></input>;
            break;
        case ('textarea'):
            inputElement = <textarea className={inputElementClasses.join(' ')} 
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}></textarea>;
            break;
        case ('select'):
            inputElement = <select className={inputElementClasses.join(' ')} 
            value={props.value}
            onChange={props.changed}>
                {props.elementConfig.options.map(option=>{
                    return <option key={option.value} value={option.value}>{option.displayValue}</option>
                })}
            </select>;
            break;
        default:
            inputElement = <input className={inputElementClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}></input>;
            break;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default Input;