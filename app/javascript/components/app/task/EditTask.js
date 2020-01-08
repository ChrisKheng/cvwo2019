import React from 'react';
import axios from 'axios';
import Modal from "../../utilities/Modal";
import TaskForm from "./TaskForm";

/**
 * Represents the edit task form modal dialog.
 * 
 * EditTask JSX attributes
 * show: toggle the visibility of the edit task form modal.
 * task: task object to prefill the edit task form.
 * onEdit: function that will be triggered when a task is edited successfully.
 * onEditFailure: function that will be triggered when edit task fails.
 * onHide: function that will be triggered when the edit task form modal's close button is closed.
 */
const EditTask = (props) => {
    /**
     * Sends a PUT request with the edited task to the app server.
     * After that, performs follow-up action accordingly and closes the edit task form modal.
     */
    const onSubmit = (editedTask) => {
        axios.put(`tasks/${props.task.id}`, editedTask)
            .then(result => {
                props.onEdit(result.data);
            })
            .catch(error => {
                props.onEditFailure(error.message);
            })
            .finally(() => {
                props.onHide();
            })
    };

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <h1>Edit Task</h1>
            <TaskForm
            content={{...props.task}}
            onSubmit={onSubmit}
            tagsProps={props.tagsProps}/>
        </Modal>
    )
};

export default EditTask;