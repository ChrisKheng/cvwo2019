import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewTask from "./NewTask";
import {AlertNewTaskSuccess} from "./Alerts";
import TaskList from "./TaskList";

class Tasks extends React.Component {
    state = {
        tasks: [],
        showNewTask: false,
        showNewTaskSuccess: false
    }

    // To initialise state
    constructor(props) {
        super(props);
        this.state.tasks = props.tasks;
    }

    componentDidMount() {
        // AJAX call
        axios.get("/tasks")
            .then(result => {
              this.setState({tasks: [...result.data]});
            })
    }

    handleOnClick = () => {
        this.setState({showNewTask: !this.state.showNewTask});
    }

    handleNewTaskSubmitted = (task) => {
        const newTasks = [...this.state.tasks];
        newTasks.push(task);
        this.setState({
            tasks: newTasks,
            showNewTask: false,
            showNewTaskSuccess: true
        });
    }

    handleAlertNewTaskClosed = () => {
        this.setState({showNewTaskSuccess: false});
    }

    render() {
        return (
            <React.Fragment>
                <button type="button" onClick={this.handleOnClick.bind(this)}>Toggle</button>
                <AlertNewTaskSuccess show={this.state.showNewTaskSuccess}
                                     handler={this.handleAlertNewTaskClosed.bind(this)}/>
                <TaskList tasks={this.state.tasks}/>
                <NewTask show={this.state.showNewTask} handleShowChanged={this.handleOnClick}/>
            </React.Fragment>
        )
    }
}

export default Tasks;