import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Alert from "react-bootstrap/Alert";
import NewTask from "./NewTask";
import TasksList from "./TasksList";
import TaskNavigationBar from "./TaskNavigationBar";
import Title from './Title';

/**
 * The page where all the tasks are displayed.
 * 
 * Master tasks page refers to the page which displays all the tasks.
 * task object: consists of these keys: id, title, description, created_at, updated_at, and tags properties.
 *              tags is the tags that are associated to the task.
 * tag object: consists of these keys: id, label, created_at, updated_at.
 * tagsProps: An object consisting utilities for operations related to tags.
 *            It consists of these keys: tags, onNewTagCreated, onNewTagFail.
 */
class Tasks extends React.Component {
    /**
     * tasks: An array of tasks created by the user.
     * visibileTasks: An array of tasks to be displayed in the page.
     * tags: An array of tags created by the user.
     * alertProps: An object used for displaying alert message.
     * variant: Type of the alert message. Refers to React-Bootstrap alert API.
     * content: Message to be displayed in the alert message.
     * isRedirectToAllTasks: A boolean which determines whether to redirect to the master tasks page all the tasks.
     */ 
    state = {
        tasks: [],
        visibleTasks: [],
        tags: [],
        isShowAlert: false,
        alertProps: {
            variant: null,
            content: null
        },
        isShowModal: false,
        isRedirectToAllTasks: false,

    }

    /**
     * Fetch all the tasks and tags created by the user.
     */
    componentDidMount() {
        axios.get("/tasks")
            .then(result => {
                this.setState({ tasks: [...result.data] });
            }).catch(error => {
                this.showFailAlert(error.message);
            })

        axios.get("/categories")
            .then(result => {
                this.setState({ tags: result.data })
            }).catch(error => {
                this.showFailAlert(error.message);
            })
    }

    componentDidUpdate() {
        // Resets the value of isRedirectToALlTasks to false after redirecting back to master tasks page 
        if (this.state.isRedirectToAllTasks) {
            this.setState({ isRedirectToAllTasks: false });
        }
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
     * Closes the new task modal and fires up a fail alert with the error message given.
     */
    handleNewTaskFail = (errorMessage) => {
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
     * Fires up a fail alert showing the errorMessage given.
     */
    showFailAlert = (errorMessage) => {
        this.setState({
            isShowAlert: true,
            alertProps: {
                variant: 'danger',
                content: errorMessage
            }
        })
    }

    //================================================== Tags =========================================================
    /**
     * Adds the newly created tag into the tag list
     */
    handleNewTagCreated = (tag) => {
        const array = [...this.state.tags];
        array.push(tag);
        this.setState({ tags: array });
    }

    /**
     * Updates the tags list and respective task objects with the edited tag and shows an alert message.
     */
    handleTagEdited = (editedTag) => {
        // Update the edited tag in tags array
        const tagsArray = [...this.state.tags];
        const index = tagsArray.findIndex(tag => tag.id === editedTag.id);
        tagsArray.splice(index, 1, editedTag);

        // Update the name of the edited tag in its respective tasks
        const visibleTasksArray = [...this.state.visibleTasks];
        visibleTasksArray.forEach(task => {
            const oldTag = task.tags.find(tag => tag.id === editedTag.id);
            oldTag.label = editedTag.label;
        })

        this.setState({
            tags: tagsArray,
            visibleTasks: visibleTasksArray,
            isShowAlert: true,
            alertProps: {
                variant: 'success',
                content: 'Tag edited! =D'
            }
        });
    }

    /**
     * Removes the deleted tag from the tags list and its respective tasks,
     * then redirect the page to the master tasks page and finally shows an alert message.
     */
    handleTagDeleted = (deletedTag) => {
        // Removes the deleted tag from tags array
        const tagsArray = [...this.state.tags];
        const index = tagsArray.findIndex(tag => tag.id === deletedTag.id);
        tagsArray.splice(index, 1);

        // Remove the deleted tag from its respective tasks
        const visibleTasksArray = [...this.state.visibleTasks];
        visibleTasksArray.forEach(task => {
            const index = task.tags.findIndex(tag => tag.id === deletedTag.id);
            task.tags.splice(index, 1);
        })

        this.setState({
            tags: tagsArray,
            visibleTasks: visibleTasksArray,
            isRedirectToAllTasks: true,
            isShowAlert: true,
            alertProps: {
                variant: 'success',
                content: 'Tag deleted! =D'
            }
        });
    }

    //================================================= Others ========================================================
    /**
     * Closes the alert shown.
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

    /**
     * Returns the respective tag object for the use of the Title component.
     * If the page is master tasks page, return { id: null, label: "All Tasks" } as the tag object.
     */
    getTitleTag = () => {
        let titleTag = undefined;
        this.state.visibleTasks = this.state.tasks;

        const { match: { params } } = this.props;
        const isFilteredTasksPage = params.tagId !== undefined;

        if (isFilteredTasksPage) {
            const id = parseInt(params.tagId);
            titleTag = this.state.tags.find(tag => tag.id === id);

            // Sets visibleTasks to the array of tasks that belong to the tag specfied.
            // isFinishedLoading: true if all the tasks and tags have been fetched from the server succeffully.
            // titleTag will be undefined if the tasks and tags have not been fetched from the server.
            const isFinishedLoading = titleTag !== undefined;
            if (isFinishedLoading) {
                this.state.visibleTasks = this.state.tasks.filter(task => {
                    return task.tags.find(tag => tag.id === titleTag.id) !== undefined;
                });
            }
        } else {
            titleTag = { id: null, label: "All Tasks" };
        }

        return titleTag;
    }

    render() {
        // Handle redirection to master tasks page.
        if (this.state.isRedirectToAllTasks) {
            return <Redirect to='/app/tasks' />;
        }

        // To load the title and tasks of the page according to the tag specified if any.
        let titleTag = this.getTitleTag();
        const isFinishedLoading = titleTag !== undefined;
        if (!isFinishedLoading) {
            return <div />
        }

        const tagsProps = {
            tags: this.state.tags,
            onNewTagCreated: this.handleNewTagCreated,
            onNewTagFail: this.showFailAlert
        }

        return (
            <React.Fragment>
                <TaskNavigationBar
                    tags={this.state.tags}
                    onClickNewTask={this.setModalVisibility.bind(this, true)} />

                <Alert
                    id="custom-alert"
                    dismissible
                    variant={this.state.alertProps.variant}
                    show={this.state.isShowAlert}
                    onClose={this.closeAlert.bind(this)}>
                    {this.state.alertProps.content}
                </Alert>

                <Title
                    tag={titleTag}
                    tags={this.state.tags}
                    onEditTag={this.handleTagEdited}
                    onEditTagFail={this.showFailAlert}
                    onDeleteTag={this.handleTagDeleted}
                    onDeleteTagFail={this.showFailAlert} />

                <TasksList
                    tasks={this.state.visibleTasks}
                    tagsProps={tagsProps}
                    onEdit={this.handleTaskEdited}
                    onEditFail={this.showFailAlert}
                    onDelete={this.handleTaskDeleted}
                    onDeleteFail={this.showFailAlert} />

                <NewTask
                    tagsProps={tagsProps}
                    show={this.state.isShowModal}
                    onClose={this.setModalVisibility.bind(this, false)}
                    onNewTaskSuccess={this.handleNewTaskSubmitted.bind(this)}
                    onNewTaskFail={this.handleNewTaskFail.bind(this)} />
            </React.Fragment>
        )
    }
}

export default Tasks;