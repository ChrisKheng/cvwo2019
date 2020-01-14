import React from 'react';
import axios from 'axios';
import ConfirmationDialog from '../../utilities/ConfirmationDialog';

/**
 * Delete Task JSX attributes
 * 
 * show
 * onClose
 * id
 * onDelete
 * onDeleteFail
 */
const DeleteTask = (props) => {
    /**
     * Sends a DELETE request to the app server.
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