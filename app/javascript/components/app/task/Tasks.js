import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewTask from "./NewTask";
import TaskList from "./TaskList";
import {AlertTaskSuccess} from "./Alerts";
import {AlertFailure} from "../../utilities/Alerts";
import TaskNavigationBar from "./TaskNavigationBar";

class Tasks extends React.Component {
    state = {
        tasks: [],
        isShowAlert: false,
        isShowAlertFailure: false,
        isShowModal: false,
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

    //================================================= Task ==========================================================
    handleNewTaskSubmitted = (task) => {
        const newTasks = [...this.state.tasks];
        newTasks.push(task);
        this.setState({
            tasks: newTasks,
            isShowModal: false,
            isShowAlert: true
        });
    }

    handleNewTaskFailure = (error) => {
        this.setState({
            isShowModal: false,
            isShowAlertFailure: true,
            message: error
        });
    }

    //================================================= Others ========================================================
    closeAlert = (key) => {
        const newState = {};
        newState[key] = false;
        this.setState(newState);
    }

    setModalVisibility = (visibility) => {
        this.setState({isShowModal: visibility});
    }

    render() {
        return (
            <React.Fragment>
                <TaskNavigationBar onClickNewTask={this.setModalVisibility.bind(this, true)}/>

                <AlertTaskSuccess show={this.state.isShowAlert}
                                  handler={this.closeAlert.bind(this, "isShowAlert")}/>
                <AlertFailure show={this.state.isShowAlertFailure}
                              handler={this.closeAlert.bind(this, "isShowAlertFailure")}>
                    {this.state.message}
                </AlertFailure>

                <TaskList tasks={this.state.tasks}/>

                <NewTask show={this.state.isShowModal}
                         onHide={this.setModalVisibility.bind(this, false)}
                         onNewTaskSuccess={this.handleNewTaskSubmitted.bind(this)}
                         onNewTaskFailure={this.handleNewTaskFailure.bind(this)}/>
            </React.Fragment>
        )
    }
}

export default Tasks;