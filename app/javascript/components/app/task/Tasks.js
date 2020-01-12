import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from "react-bootstrap/Alert";
import NewTask from "./NewTask";
import TasksList from "./TasksList";
import TaskNavigationBar from "./TaskNavigationBar";
import Title from './Title';
import PageNotFound from '../../utilities/PageNotFound';

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
        tags: [],
        isShowAlert: false,
        isShowModal: false,
        alertProps: {
            variant: null,
            content: null
        }
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

        axios.get("/categories")
            .then(result => {
                const tags = result.data.map(tag => {
                    return {
                        id: tag.id,
                        label: tag.name
                    }
                })
                this.setState({ tags: tags })
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

    //================================================== Tags =========================================================
    handleNewTagCreated = (tag) => {
        const array = [...this.state.tags];
        array.push(tag);
        this.setState({ tags: array });
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
        const tagsProps = {
            tags: this.state.tags.map(tag => {
                return {
                    id: tag.id,
                    label: tag.label
                }
            }),
            onNewTagCreated: this.handleNewTagCreated
        }

        // To load the title and tasks of the page (filter)
        let titleTag = "";
        let visibleTasks = this.state.tasks;

        const { match: { params } } = this.props;
        if (params.tagId !== undefined) {
            const id = parseInt(params.tagId);
            const targetTag = this.state.tags.find(tag => tag.id === id);

            // Filter the list of tasks according to the tag specified
            if (targetTag !== undefined) {
                titleTag = targetTag;
                visibleTasks = this.state.tasks.filter(task => {
                    return task.tags.find(tag => tag.id === targetTag.id) !== undefined;
                });
            } else {
                return <PageNotFound />
            }
        } else {
            titleTag = { id: null, label: "All Tasks" };
        }

        return (
            <React.Fragment>
                <TaskNavigationBar
                    tags={this.state.tags}
                    onClickNewTask={this.setModalVisibility.bind(this, true)} />

                <Alert
                    dismissible
                    variant={this.state.alertProps.variant}
                    show={this.state.isShowAlert}
                    onClose={this.closeAlert.bind(this)}>
                    {this.state.alertProps.content}
                </Alert>

                <Title tag={titleTag} />

                <TasksList
                    tasks={visibleTasks}
                    tagsProps={tagsProps}
                    onEdit={this.handleTaskEdited}
                    onEditFailure={this.showFailureAlert}
                    onDelete={this.handleTaskDeleted}
                    onDeleteFailure={this.showFailureAlert} />

                <NewTask
                    tagsProps={tagsProps}
                    show={this.state.isShowModal}
                    onHide={this.setModalVisibility.bind(this, false)}
                    onNewTaskSuccess={this.handleNewTaskSubmitted.bind(this)}
                    onNewTaskFailure={this.handleNewTaskFailure.bind(this)} />
            </React.Fragment>
        )
    }
}

export default Tasks;