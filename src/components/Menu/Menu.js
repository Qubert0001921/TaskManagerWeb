import React from 'react';
import DialogBox from '../DialogBox/DialogBox';
import user from './user.png';
import './Menu.css'

class Menu extends React.Component {
    state = {
        userSettingsDialog: false
    }

    render() {
        return (<div id="menu">
            <DialogBox show={this.state.userSettingsDialog} onClose={() => this.setState({userSettingsDialog: false})}>

            </DialogBox>
            <div id="user-img">
                <img src={user} width="50px" height="50px" onClick={() => this.setState({userSettingsDialog: true})}/>
            </div>
        </div>)
    }
}

export default Menu;