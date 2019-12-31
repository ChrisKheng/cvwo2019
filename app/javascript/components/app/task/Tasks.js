import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewTask from "./NewTask";
import TaskList from "./TaskList";
import {AlertTaskSuccess} from "./Alerts";
import {AlertFailure} from "../../utilities/Alerts";

class Tasks extends React.Component {
    state = {
        tasks: [],
        showModal: false,
        showAlert: false,
        showAlertFailure: false,
        message: ''
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

    handleNewTaskFailure = (error) => {
        this.setState({
            showModal: false,
            showAlertFailure: true,
            message: error
        });
    }

    handleAlertShowChanged = (key) => {
        const newState = {};
        newState[key] = false;
        this.setState(newState);
    }

    render() {
        return (
            <React.Fragment>
                <button type="button" onClick={this.handleOnClick.bind(this)}>Toggle</button>
                <AlertTaskSuccess show={this.state.showAlert}
                                  handler={this.handleAlertShowChanged.bind(this, "showAlert")}/>
                <AlertFailure show={this.state.showAlertFailure}
                              handler={this.handleAlertShowChanged.bind(this, "showAlertFailure")}>
                    {this.state.message}
                </AlertFailure>

                <TaskList tasks={this.state.tasks}/>

                <NewTask show={this.state.showModal}
                         handleShowChanged={this.handleOnClick.bind(this)}
                         handleNewTask={this.handleNewTaskSubmitted.bind(this)}
                         handleNewTaskFailure={this.handleNewTaskFailure.bind(this)}/>
            </React.Fragment>
        )
    }
}

export default Tasks;