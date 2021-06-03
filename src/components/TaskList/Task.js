import React from 'react';
import arrow_left from './arrow_left.png';
import arrow_down from './arrow-down.png';

class Task extends React.Component{    
    state = {
        showDesc: false,
        showDescImage: arrow_left,
        descBlock: ""
    }

    render () {
        let desc = this.props.element.desc;
        const title = this.props.element.title;
        const _id = this.props.element._id;

        const descBlock = (
        <div className="Desc" >
            <label className="desc">{desc}</label>
            <div className="EditDeleteTask" >
                <button className="EditTask" onClick={this.props.onEdit}>Edytuj</button>
                <button className="DeleteTask" onClick={this.props.onDelete}>Usuń</button>
            </div>
            <div className="clear"></div>
        </div>)
        
        const negateShowDesc = () => {
            this.setState({ showDesc: !this.state.showDesc });
            if(this.state.showDescImage === arrow_left) this.setState({showDescImage: arrow_down, descBlock: descBlock});
            else this.setState({showDescImage: arrow_left, descBlock: ""});  
        }

        return (
            <div className="task" key={_id}>
                <div className="taskleftElement">
                    <input type="checkbox" className="task" />
                </div>
                <div className="taskrightElement">
                    <img className="showDesc" onClick={negateShowDesc} src={this.state.showDescImage} width="32" height="32"/>
                </div>
                <div className="taskTitle">
                    <h1 className="taskTitle">{title}</h1>
                </div>
                <div className="clear"></div>
                {this.state.descBlock}
            </div>
        );
    }
}

export default Task;