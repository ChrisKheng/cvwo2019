import React from 'react';
import axios from 'axios';
import ConfirmationDialog from '../../utilities/ConfirmationDialog';

/**
 * A confirmation dialog for deleting a task.
 * 
 * props properties 
 * id: An integer which is the id of the task to be deleted.
 * show: A boolean which shows the delete task dialog if set to true.
 * onClose: A function which is triggered when the No button of the dialog is clicked.
 * onDelete: A function which is triggered when the Yes button of the dialog is clicked.
 * onDeleteFail: A function which is triggered when deleting the task fails.
 */
const DeleteTask = (props) => {
    /**
     * Sends a DELETE request to the app server to delete the task with the given id.
     * After that, performs follow up actions accordingly and closes the delete dialog.
     */
    const handleDeleteTask = () => {
        axios.delete(`/tasks/${props.id}`)
            .then(() => {
                props.onDelete(props.id);
            }).catch((error) => {
                props.onDeleteFail(error.message);
            }).finally(() => {
                props.onClose();
            })
    }

    return (
        <ConfirmationDialog
            show={props.show}
            onClose={props.onClose}
            onConfirm={handleDeleteTask} />
    )
}

export default DeleteTask;