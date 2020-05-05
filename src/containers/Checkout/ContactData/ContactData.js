import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner';
import {withRouter} from 'react-router-dom'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'
class ContactData extends Component {
    state = { 
        orderForm : {
            name :{
                elementType:'input',
                elementConfig :{
                    type:'text',
                    placeholder:'Your Name'
                },
                validation : {
                    required : true
                },
                valid:false,
                touched : false,
                value : ''
            },
            street : {
                elementType:'input',
                elementConfig :{
                    type:'text',
                    placeholder:'Street'
                },
                validation : {
                    required : true
                },
                valid:false,
                touched : false,
                value : ''
            },
            zipcode : {
                elementType:'input',
                elementConfig :{
                    type:'text',
                    placeholder:'Zip Code'
                },
                validation : {
                    required : true,
                    minLength:4,
                    maxLength:7
                },
                valid:false,
                touched : false,
                value : ''
            },
            country : {
                elementType:'input',
                elementConfig :{
                    type:'text',
                    placeholder:'Country'
                },
                validation : {
                    required : true
                },
                valid:false,
                touched : false,
                value : ''
            },
            email : {
                elementType:'input',
                elementConfig :{
                    type:'email',
                    placeholder:'Your Email'
                },
                validation : {
                    required : true
                },
                valid:false,
                touched : false,
                value : ''
            },
            delivery : {
                elementType:'select',
                elementConfig :{
                    options : [
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapest'}
                    ]
                },
                valid:true,
                validation:{},
                touched : false,
                value : 'fastest'
            }
        },
        formIsValid : false,
        loading : false
     }
    orderHandler = (event)=>{
        event.preventDefault();
        this.setState({loading:true});
        const formData = {};
        for(let element in this.state.orderForm){
            console.log(element);
            formData[element] = this.state.orderForm[element].value;
        } 
        const order = {
            ingredients : this.props.ings,
            totalPrice : parseFloat(this.props.price).toFixed(2),
            orderdata : formData
        }
        axios.post('/orders.json',order).then((response)=>{
            this.setState({loading:false});
            this.props.history.push('/');
        }).catch(error=>this.setState({loading:false}));
    }
    inputChangeHandler = (event,id)=>{
        //console.log(event.target.value,id)
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedOrderFormElement = {
            ...updatedOrderForm[id]
        };
        updatedOrderFormElement['value'] = event.target.value;
        updatedOrderFormElement['valid'] = this.checkValidity(updatedOrderFormElement['value'],updatedOrderFormElement['validation']);
        console.log(updatedOrderForm);
        let formIsValid = true;
        for(let key in updatedOrderForm){
            formIsValid = updatedOrderForm[key].valid && formIsValid;
        }
        updatedOrderFormElement['touched'] = true;
        updatedOrderForm[id] = updatedOrderFormElement;

        this.setState({orderForm:updatedOrderForm, formIsValid:formIsValid});
    }
    checkValidity= (value,rules)=>{
        let isValid = true;
        if(rules.required){
            isValid = value !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }
    render() {
        let formElementsArray = [];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        } 
        let form = (
            <form onSubmit={this.orderHandler}>
                   {
                       formElementsArray.map((formElement)=>{
                        return <Input elementType={formElement.config.elementType}
                           elementConfig = {formElement.config.elementConfig}
                           key = {formElement.id}
                           value={formElement.config.value}
                           invalid = {!formElement.config.valid}
                           validation = {formElement.config.validation}
                           touched = {formElement.config.touched}
                           changed={(event)=>this.inputChangeHandler(event,formElement.id)}
                           />
                       })
                   }
                   <Button disabled = {!this.state.formIsValid} btnType = 'Success'>ORDER</Button>
            </form>
        );
        if(this.state.loading){
            form = <Spinner></Spinner>
        }
        return (
           <div className={classes.ContactData}>
               <h4>Enter your contact data</h4>
               {form}
           </div> 
        );
    }
}
const mapStateToProps = state => {
    return {
        ings : state.ingredients,
        price : state.totalPrice
    }
}
export default connect(mapStateToProps)(withRouter(ContactData));