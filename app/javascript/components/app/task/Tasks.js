import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from "react-bootstrap/Alert";
import NewTask from "./NewTask";
import TaskList from "./TaskList";
import TaskNavigationBar from "./TaskNavigationBar";

class Tasks extends React.Component {
    state = {
        tasks: [],
        isShowAlert: false,
        isShowModal: false,
        alertProps: {
            variant: null,
            content: null
        }
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
            isShowAlert: true,
            alertProps: {
                variant: 'success',
                content: 'New task is saved! =D'
            }
        });
    }

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

    handleTaskDeleted = (taskId) => {
        const newTasks = [...this.state.tasks];
        const index = newTasks.findIndex(task => task.id === taskId);
        newTasks.splice(index, 1);

        this.setState({
            tasks: newTasks,
            isShowAlert: true,
            alertProps: {
                variant: 'success',
                content: `Task is deleted! =D`
            }
        });
    }

    handleTaskDeleteFailure = (errorMessage) => {
        this.setState({
            isShowAlert: true,
            alertProps: {
                variant: 'danger',
                content: errorMessage
            }
        })
    }

    //================================================= Others ========================================================
    closeAlert = () => {
        this.setState({isShowAlert: false});
    }

    setModalVisibility = (visibility) => {
        this.setState({isShowModal: visibility});
    }

    render() {
        return (
            <React.Fragment>
                <TaskNavigationBar onClickNewTask={this.setModalVisibility.bind(this, true)}/>

                <Alert dismissible
                       variant={this.state.alertProps.variant}
                       show={this.state.isShowAlert}
                       onClose={this.closeAlert.bind(this)}>
                    {this.state.alertProps.content}
                </Alert>

                <TaskList tasks={this.state.tasks}
                          onDelete={this.handleTaskDeleted}
                          onDeleteFailure={this.handleTaskDeleteFailure}/>

                <NewTask show={this.state.isShowModal}
                         onHide={this.setModalVisibility.bind(this, false)}
                         onNewTaskSuccess={this.handleNewTaskSubmitted.bind(this)}
                         onNewTaskFailure={this.handleNewTaskFailure.bind(this)}/>
            </React.Fragment>
        )
    }
}

export default Tasks;