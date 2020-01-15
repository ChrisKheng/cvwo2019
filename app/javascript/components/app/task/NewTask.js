import React from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskForm from "./TaskForm";
import Modal from "../../utilities/Modal";

/**
 * Represents the new task form modal dialog.
 * 
 * NewTask JSX attributes
 * show: toggle the visibility of the new task form modal.
 * onHide: function that will trigger when the new task form modal's close button is closed.
 * onNewTaskSuccess: function that will be triggered when a new task is created successfully.
 * onNewTaskFail: function that will be triggered when creating a new task fails.
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
        }
        ).catch((error) => {
            this.props.onNewTaskFail(error.message);
        })
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <h1>New Task</h1>
                <TaskForm onSubmit={this.handleSubmit} tagsProps={this.props.tagsProps}/>
            </Modal>
        )
    }
}

export default NewTask;