import React from 'react';
import TaskList from '../TaskList/TaskList';
import Menu from '../Menu/Menu';
import { Redirect } from 'react-router-dom';
import TasksClient from '../../client/tasks';

class Todo extends React.Component {
    state = {
        page: "Hello!"
    }
    
    async componentDidMount() {
        console.log(localStorage.getItem("AccessToken"));
        let tasks;
        try {
            tasks = await TasksClient.getTasks();
        } catch(err) {
            // if(err.response.status === 403) return this.setState({page: <Redirect to="/login" />})
            return console.log(err.response);
        }
        this.setState({ page: <div><Menu /><TaskList tasks={tasks} /></div> })
    }

    render() {

        return (<div>{this.state.page}</div>)
    }
}

export default Todo;