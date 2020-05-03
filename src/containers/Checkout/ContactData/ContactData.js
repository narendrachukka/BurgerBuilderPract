import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner';
import {withRouter} from 'react-router-dom'

class ContactData extends Component {
    state = { 
        name:'',
        email:'',
        address : {
            street:'',
            pincode : ''
        },
        loading : false
     }
    orderHandler = (event)=>{
        event.preventDefault();
        this.setState({loading:true});
        const order = {
            ingredients : this.props.ingredients,
            totalPrice : parseFloat(this.props.price).toFixed(2),
            customer : {
                name : 'Narendra chukka',
                address : {
                    street : 'Viveka nanda nagar',
                    zipcode : '530040',
                    country : 'india'
                },
                email : 'test.test@test.com',
                delivery : 'fastest'
            }
        }
        axios.post('/orders.json',order).then((response)=>{
            this.setState({loading:false});
            this.props.history.push('/');
        }).catch(error=>this.setState({loading:false}));
    }
    render() {
        let form = (
            <form>
                   <input className={classes.Input} type='text' name ='name' placeholder='Your Name' />
                   <input className={classes.Input} type='email' name ='email' placeholder='Your email' />
                   <input className={classes.Input} type='text' name ='Street' placeholder='Street' />
                   <input className={classes.Input} type='text' name ='Postal' placeholder='Postal Code' /> 
                   <Button btnType = 'Success' clicked={this.orderHandler}>ORDER</Button>
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

export default withRouter(ContactData);