import React from 'react';
import DialogBox from '../DialogBox/DialogBox';
import user from './user.png';
import './Menu.css'

class Menu extends React.Component {

    render() {
        return (<div id="menu">
            <div id="user-img">
                <img src={user} width="50px" height="50px"/>
            </div>
            <div id="logout">
                <a href="/login">Logout</a>
            </div>
            <div style={{clear: 'both'}}></div>
        </div>)
    }
}

export default Menu;