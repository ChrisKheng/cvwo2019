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
        showAlert: false,
        showAlertFailure: false,
        message: '',
        modal: null,
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
            modal: null,
            showAlert: true
        });
    }

    handleNewTaskFailure = (error) => {
        this.setState({
            modal: null,
            showAlertFailure: true,
            message: error
        });
    }

    //============================================ Navigation Bar =====================================================
    handleNewTaskClicked = () => {
        const newTask = (
            <NewTask show={true}
                     handleShowChanged={this.handleOnClick.bind(this)}
                     handleNewTask={this.handleNewTaskSubmitted.bind(this)}
                     handleNewTaskFailure={this.handleNewTaskFailure.bind(this)}/>
        );

        this.handleShowModal(newTask);
    }

    //================================================= Others ========================================================
    handleAlertShowChanged = (key) => {
        const newState = {};
        newState[key] = false;
        this.setState(newState);
    }

    handleShowModal = (modal) => {
        this.setState({
            modal: modal,
        });
    }

    handleOnClick = () => {
        this.setState({
            modal: null,
        });
    }


    render() {
        return (
            <React.Fragment>
                <TaskNavigationBar onClickNewTask={this.handleNewTaskClicked.bind(this)}/>

                <AlertTaskSuccess show={this.state.showAlert}
                                  handler={this.handleAlertShowChanged.bind(this, "showAlert")}/>
                <AlertFailure show={this.state.showAlertFailure}
                              handler={this.handleAlertShowChanged.bind(this, "showAlertFailure")}>
                    {this.state.message}
                </AlertFailure>

                <TaskList tasks={this.state.tasks}/>

                {this.state.modal}
            </React.Fragment>
        )
    }
}

export default Tasks;