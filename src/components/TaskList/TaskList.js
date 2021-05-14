import React from 'react';
import Task from './Task';
import DialogBox from '../DialogBox/DialogBox';
import TaskValidator from './Validation/validator';

class TaskList extends React.Component {
    state = {
        tasks: [
            { id: "32tr23g23g", title: "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },  
        ],
        addTask: false,
        TaskTitle: "",
        TaskDesc: "",
        TaskTitleValidation: null,
        TaskDescValidation: null,
        editTask: false,
        editTaskElement: null
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
        const tasks = this.state.tasks.map(task => <Task element={task} onEdit={() => showEditTaskForm(task)} onDelete={() => deleteTask(task.id)}/>);
        const onTitleChange = event => this.setState({ TaskTitle: event.target.value });
        const onDescChange = event => this.setState({ TaskDesc: event.target.value });
        const exitAddTaskForm = () => this.setState({addTask: false, TaskTitleValidation: null, TaskDescValidation: null});
        const exiteditTaskForm = () => this.setState({editTask: false});

        const createTask = () => {
            const title = this.state.TaskTitle;
            const desc = this.state.TaskDesc;
            const titleValidation = TaskValidator.validateTitle(title);
            const descValidation = TaskValidator.validateDesc(desc);

            if(titleValidation || descValidation) {
                this.setState({ TaskTitleValidation: titleValidation, TaskDescValidation: descValidation});
            } else {
                this.state.tasks.push({ id:"dqwdq3r32FF", title: title, desc: desc });
                this.setState({ 
                    TaskDescValidation: null, 
                    TaskTitleValidation: null,
                    addTask: false,
                    tasks: this.state.tasks
                });

            }   
        }

        const deleteTask = id => {
            const tasks = this.state.tasks;
            tasks.forEach(task => {
                if(task.id === id) {
                    delete tasks[tasks.indexOf(task)];
                } 
            });

            this.setState({ tasks: tasks });
        }

        const editTask = () => {
            const tasks = this.state.tasks;
            const titleValidation = TaskValidator.validateTitle(this.state.TaskTitle);
            const descValidation = TaskValidator.validateDesc(this.state.TaskDesc);

            if(titleValidation || descValidation) {
                this.setState({ TaskTitleValidation: titleValidation, TaskDescValidation: descValidation});
            } else {
                tasks.forEach(task => {
                    if(task.id === this.state.editTaskElement.id) {
                        task.title = this.state.TaskTitle;
                        task.desc = this.state.TaskDesc;
                        
                        this.setState({ 
                            TaskDescValidation: null, 
                            TaskTitleValidation: null,
                            editTask: false,
                            tasks: this.state.tasks
                        });
                    }
                });
            }
        }

        return (
        <div id="home">
            <button onClick={showAddTaskForm}>Add Task</button>
            <DialogBox show={this.state.addTask} onClose={exitAddTaskForm} width="500px" height="480px">
                <h1>Stwórz zadanie</h1>
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