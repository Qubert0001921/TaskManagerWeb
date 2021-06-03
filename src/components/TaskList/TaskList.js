import React from 'react';
import Task from './Task';
import DialogBox from '../DialogBox/DialogBox';
import TaskValidator from './Validation/validator';
import TasksClient from '../../client/tasks';

class TaskList extends React.Component {
    state = {
        tasks: this.props.tasks,
        addTask: false,
        TaskTitle: "",
        TaskDesc: "",
        TaskTitleValidation: null,
        TaskDescValidation: null,
        editTask: false,
        editTaskElement: null
    }

    // set all tasks
    async componentDidMount() {
        const tasks = await TasksClient.getTasks();
        this.setState({tasks: tasks});
    }

    render() {
        const showAddTaskForm = () => {
            if(this.state.editTask) this.setState({ addTask: true, editTask: false});
            else this.setState({ addTask: true });
        }
        const showEditTaskForm = task => {
            if(this.state.addTask) this.setState({ addTask: false, editTask: true});
            else this.setState({ editTask: true, editTaskElement: task, TaskTitle: task.title, TaskDesc: task.desc});
        }
        const tasks = this.state.tasks.map(task => <Task element={task} onEdit={() => showEditTaskForm(task)} onDelete={() => deleteTask(task._id)}/>);
        const onTitleChange = event => this.setState({ TaskTitle: event.target.value });
        const onDescChange = event => this.setState({ TaskDesc: event.target.value });
        const exitAddTaskForm = () => this.setState({addTask: false, TaskTitleValidation: null, TaskDescValidation: null, TaskTitle: "", TaskDesc: ""});
        const exiteditTaskForm = () => this.setState({editTask: false, TaskTitleValidation: null, TaskDescValidation: null, TaskTitle: "", TaskDesc: ""});

        const createTask = async () => {
            const tasks = this.state.tasks;
            const title = this.state.TaskTitle;
            const desc = this.state.TaskDesc;
            const titleValidation = TaskValidator.validateText(title, 32, "Nieprawidłowy tytuł!");
            const descValidation = TaskValidator.validateText(desc, 1000, "Nieprawidłowy opis!");

            if(titleValidation || descValidation) {
                this.setState({ TaskTitleValidation: titleValidation, TaskDescValidation: descValidation});
            } else {
                const task = await TasksClient.createTask({title: title, desc: desc});
                tasks.push(task);
                this.setState({ 
                    TaskDescValidation: null, 
                    TaskTitleValidation: null,
                    addTask: false,
                    tasks: this.state.tasks,
                    TaskTitle: "",
                    TaskDesc: ""
                });

            }   
        }

        const deleteTask = id => {
            const tasks = this.state.tasks;
            tasks.forEach(task => {
                if(task._id === id) {
                    TasksClient.deleteTask(id);
                    delete tasks[tasks.indexOf(task)];
                } 
            });

            this.setState({ tasks: tasks });
        }

        const editTask = () => {
            const tasks = this.state.tasks;
            const title = this.state.TaskTitle;
            const desc = this.state.TaskDesc;
            const titleValidation = TaskValidator.validateText(title, 32, "Nieprawidłowy tytuł!");
            const descValidation = TaskValidator.validateText(desc, 1000, "Nieprawidłowy opis!");

            // check validation
            if(titleValidation || descValidation) {
                this.setState({ TaskTitleValidation: titleValidation, TaskDescValidation: descValidation});
            } else {
                tasks.forEach(task => {
                    if(task._id === this.state.editTaskElement._id) {
                        // edit task in frontend
                        task.title = this.state.TaskTitle;
                        task.desc = this.state.TaskDesc;

                        // edit task in backend
                        TasksClient.editTask(task._id, {title: this.state.TaskTitle, desc: this.state.TaskDesc});
                        
                        // set state values
                        this.setState({ 
                            TaskDescValidation: null, 
                            TaskTitleValidation: null,
                            editTask: false,
                            tasks: this.state.tasks,
                            TaskTitle: "",
                            TaskDesc: ""
                        });
                    }
                });
            }
        }

        return (
        <div id="home">
            <div id="options">
                <div id="logo" style={{float: 'left'}}>
                    <label className="title">Lista zadań</label>
                </div>
                <div id="TaskOptions">
                    <button id="addTask" onClick={showAddTaskForm}>+ dodaj</button>
                </div>
                <div className="clear"></div>
            </div>
            <DialogBox show={this.state.addTask} onClose={exitAddTaskForm} width="500px" height="480px">
                <h1>Dodaj zadanie</h1>
                <label className="formElement">Tytuł: </label>
                <label className="Validation">{this.state.TaskTitleValidation}</label>
                    <br />
                <input type="text" className="title" onChange={onTitleChange}/>
                    <br /><br />
                <label>Opis: </label>
                <label className="Validation">{this.state.TaskDescValidation}</label>
                    <br />
                <textarea className="description" onChange={onDescChange}></textarea>
                    <br />
                <div className="formMenuButtons">
                    <button className="cancel" onClick={exitAddTaskForm}>Anuluj</button>
                    <button className="save" onClick={createTask}>Zapisz</button>
                </div>
            </DialogBox>
            <DialogBox show={this.state.editTask} onClose={exiteditTaskForm} width="500px" height="480px">
                <h1>Edytuj zadanie</h1>
                <label className="formElement">Tytuł: </label>
                <label className="Validation">{this.state.TaskTitleValidation}</label>
                    <br />
                <input type="text" className="title" onChange={onTitleChange} value={this.state.TaskTitle}/>
                    <br /><br />
                <label>Opis: </label>
                <label className="Validation">{this.state.TaskDescValidation}</label>
                    <br />
                <textarea className="description" onChange={onDescChange} value={this.state.TaskDesc}></textarea>
                    <br />
                <div className="formMenuButtons">
                    <button className="cancel" onClick={exiteditTaskForm}>Anuluj</button>
                    <button className="EditTask" onClick={editTask}>Edytuj</button>
                </div>
            </DialogBox>
            {tasks}
        </div>
        )
    }
}

export default TaskList;