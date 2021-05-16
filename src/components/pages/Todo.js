import React from 'react';
import TaskList from '../TaskList/TaskList';
import Menu from '../Menu/Menu';

class Todo extends React.Component {
    render() {
        return (<div>
            <Menu />
            <TaskList />
        </div>)
    }
}

export default Todo;