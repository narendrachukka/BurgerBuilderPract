import React from 'react';
import classes from './SideDrawer.module.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop'

const SideDrawer = (props) => {
    let sideBarClasses = [classes.SideDrawer,classes.Open];
    if(!props.open){
        sideBarClasses = [classes.SideDrawer,classes.Close];
    }
    return (
        <Aux>
            <Backdrop show = {props.open} clicked = {props.clicked}></Backdrop>
            <div className = {sideBarClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo></Logo>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
    );
}

export default SideDrawer;