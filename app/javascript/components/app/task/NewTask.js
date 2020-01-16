import React from 'react';
import axios from "axios";
import TaskForm from "./TaskForm";
import Modal from "../../utilities/Modal";

/**
 * A form dialog for creating a new task.
 * 
 * props properties 
 * tagsProps: An object consisting properties for operations related to tags, see Tasks components documentation.
 * show: A boolean which toggles the visibility of the dialog.
 * onHide: A function which is triggered when the close button of the dialog is clicked.
 * onNewTaskSuccess: A function which is triggered when a new task is created successfully.
 * onNewTaskFail: A function which is triggered when creating a new task fails.
 */
class NewTask extends React.Component {
    /**
     * Sends a POST request with the newly created task to the app server.
     * After that, performs follow-up action accordingly.
     */
    handleSubmit = (newTask) => {
        // AJAX call
        axios.post("/tasks", {
            task: { ...newTask }
        }).then(result => {
            this.props.onNewTaskSuccess(result.data);
        }).catch((error) => {
            this.props.onNewTaskFail(error.message);
        })
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <h1>New Task</h1>
                <TaskForm
                    onSubmit={this.handleSubmit}
                    tagsProps={this.props.tagsProps}/>
            </Modal>
        )
    }
}

export default NewTask;