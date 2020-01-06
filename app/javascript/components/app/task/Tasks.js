import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from "react-bootstrap/Alert";
import NewTask from "./NewTask";
import TasksList from "./TasksList";
import TaskNavigationBar from "./TaskNavigationBar";

/**
 * Represents the tasks page where all the tasks are displayed.
 * 
 * Tasks JSX attributes
 * tasks: an array of tasks to be displayed in the tasks page.
 */
class Tasks extends React.Component {
    // content: message to be displayed in the alert
    state = {
        tasks: [],
        isShowAlert: false,
        isShowModal: false,
        alertProps: {
            variant: null,
            content: null 
        }
    }

    /**
     * To initialise state.
     */ 
    constructor(props) {
        super(props);
        this.state.tasks = props.tasks;
    }

    /**
     * Fetch all the tasks to be displayed.
     */
    componentDidMount() {
        // AJAX call
        axios.get("/tasks")
            .then(result => {
                this.setState({ tasks: [...result.data] });
            })
    }

    //================================================= Task ==========================================================
    /**
     * Adds the newly created task into the tasks list, closes the new task modal and fires up a success alert.
     */ 
    handleNewTaskSubmitted = (task) => {
        const newTasks = [...this.state.tasks];
        newTasks.push(task);
        this.setState({
            tasks: newTasks,
            isShowModal: false,
            isShowAlert: true,
            alertProps: {
                variant: 'success',
                content: 'Task created! =D'
            }
        });
    }

    /** 
     * Closes the new task modal and fires up a failure alert with the error message given.
     */ 
    handleNewTaskFailure = (errorMessage) => {
        this.setState({
            isShowModal: false,
            isShowAlert: true,
            alertProps: {
                variant: 'danger',
                content: errorMessage
            }
        });
    }

    /**
     * Deletes the task with the taskId given from the tasks list and fires up a success alert.
     */ 
    handleTaskDeleted = (taskId) => {
        const newTasks = [...this.state.tasks];
        const index = newTasks.findIndex(task => task.id === taskId);
        newTasks.splice(index, 1);

        this.setState({
            tasks: newTasks,
            isShowAlert: true,
            alertProps: {
                variant: 'success',
                content: 'Task deleted! =D'
            }
        });
    }

    /**
     * Updates the edited task in the tasks list and fires up a success alert.
     */ 
    handleTaskEdited = (editedTask) => {
        const newTasks = [...this.state.tasks];
        const index = newTasks.findIndex((task) => task.id === editedTask.id);
        newTasks.splice(index, 1);
        newTasks.push(editedTask);

        this.setState({
            tasks: newTasks,
            isShowAlert: true,
            alertProps: {
                variant: 'success',
                content: 'Task edited! =D'
            }
        })
    }

    /**
     * Fires up a failure alert showing the errorMessage given.
     */ 
    showFailureAlert = (errorMessage) => {
        this.setState({
            isShowAlert: true,
            alertProps: {
                variant: 'danger',
                content: errorMessage
            }
        })
    }

    //================================================= Others ========================================================
    /**
     * Closes the alert shown (can be used for both success and failure alert).
     */
    closeAlert = () => {
        this.setState({ isShowAlert: false });
    }

    /**
     * Sets the new task modal visibility with true or false.
     */
    setModalVisibility = (visibility) => {
        this.setState({ isShowModal: visibility });
    }

    render() {
        return (
            <React.Fragment>
                <TaskNavigationBar onClickNewTask={this.setModalVisibility.bind(this, true)} />

                <Alert
                    dismissible
                    variant={this.state.alertProps.variant}
                    show={this.state.isShowAlert}
                    onClose={this.closeAlert.bind(this)}>
                    {this.state.alertProps.content}
                </Alert>

                <TasksList
                    tasks={this.state.tasks}
                    onEdit={this.handleTaskEdited}
                    onEditFailure={this.showFailureAlert}
                    onDelete={this.handleTaskDeleted}
                    onDeleteFailure={this.showFailureAlert} />

                <NewTask
                    show={this.state.isShowModal}
                    onHide={this.setModalVisibility.bind(this, false)}
                    onNewTaskSuccess={this.handleNewTaskSubmitted.bind(this)}
                    onNewTaskFailure={this.handleNewTaskFailure.bind(this)} />
            </React.Fragment>
        )
    }
}

export default Tasks;