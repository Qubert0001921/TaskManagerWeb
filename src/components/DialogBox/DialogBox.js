import React from 'react';
import './DialogBox.css';

class DialogBox extends React.Component {
    render() {
        const style = {
            width: this.props.width,
            height: this.props.height
        }
        const content = this.props.children;

        const dialogbox = (
            <div className="DialogBox" style={style}>
                <button className="DialogButton" onClick={this.props.onClose}>✕</button>
                {content}
            </div>
        )
        return <div>{this.props.show ? dialogbox : null}</div>;
    }
}

export default DialogBox;