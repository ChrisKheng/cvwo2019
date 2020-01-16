import React from 'react';
import axios from 'axios';
import TaskForm from "./TaskForm";
import Modal from "../../utilities/Modal";

/**
 * A form dialog for editing a task.
 * 
 * props properties 
 * task: A task object to prefill the fields of the edit task form.
 * tagsProps: An object consisting properties for operations related to tags, see Tasks components documentation.
 * show: A boolean which toggles the visibility of the dialog.
 * onEdit: A function that is triggered when a task is edited successfully, i.e. a success message is sent back
 *         by the server.
 * onEditFail: A function that is triggered when editing the task fails.
 * onHide: A function that is triggered when the close button of the dialog is clicked.
 */
const EditTask = (props) => {
    /**
     * Sends a PUT request with the edited task to the app server.
     * After that, performs follow-up action accordingly and closes the dialog.
     */
    const onSubmit = (editedTask) => {
        axios.put(`/tasks/${props.task.id}`, {
            task: { ...editedTask }
        }).then(result => {
            props.onEdit(result.data);
        }).catch(error => {
            props.onEditFail(error.message);
        }).finally(() => {
            props.onHide();
        })
    };

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <h1>Edit Task</h1>
            <TaskForm
                content={{ ...props.task }}
                tagsProps={props.tagsProps}
                onSubmit={onSubmit}/>
        </Modal>
    )
};

export default EditTask;