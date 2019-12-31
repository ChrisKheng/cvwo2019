import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewTask from "./NewTask";
import {AlertNewTaskSuccess} from "./Alerts";
import TaskList from "./TaskList";

class Tasks extends React.Component {
    state = {
        tasks: [],
        showModal: false,
        showAlert: false
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
        this.setState({showModal: !this.state.showModal});
    }

    handleNewTaskSubmitted = (task) => {
        const newTasks = [...this.state.tasks];
        newTasks.push(task);
        this.setState({
            tasks: newTasks,
            showModal: false,
            showAlert: true
        });
    }

    handleAlertShowChanged = () => {
        this.setState({showAlert: false});
    }

    render() {
        return (
            <React.Fragment>
                <button type="button" onClick={this.handleOnClick.bind(this)}>Toggle</button>
                <AlertNewTaskSuccess show={this.state.showAlert}
                                     handler={this.handleAlertShowChanged.bind(this)}/>
                <TaskList tasks={this.state.tasks}/>
                <NewTask show={this.state.showModal} handleShowChanged={this.handleOnClick}
                    handleNewTask={this.handleNewTaskSubmitted}/>
            </React.Fragment>
        )
    }
}

export default Tasks;