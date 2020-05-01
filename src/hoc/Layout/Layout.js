import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = { showSideBar : false };
    sideBarCloseHandler = () => this.setState({showSideBar : false});
    sideBarToggleHandler = () => this.setState((prevState)=>{
        return {showSideBar : !prevState.showSideBar}
    });
    render() {
        return (
            <Aux>
                <Toolbar clicked = {this.sideBarToggleHandler} ></Toolbar>
                <SideDrawer clicked = {this.sideBarCloseHandler} open ={this.state.showSideBar} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;
