import React from 'react';
import axios from 'axios';
import ConfirmationDialog from '../../utilities/ConfirmationDialog';

/**
 * A confirmation dialog for deleting a tag.
 * 
 * props properties 
 * tag: The tag object which may be deleted. 
 * show: A boolean which shows the delete tag dialog if set to true.
 * onClose: A function which is triggered when the No button of the dialog is clicked.
 * onDelete: A function which is triggered when the Yes button of the dialog is clicked.
 * onDeleteFail: A  function which is triggered when deleting the tag fails.
 */
const DeleteTag = (props) => {
    /**
     * Sends a DELETE request to the app server to delete the given tag.
     * After that, performs follow up actions accordingly and closes the delete dialog.
     */
    const handleDeleteTag = () => {
        axios.delete(`/categories/${props.tag.id}`)
        .then(() => {
            props.onDelete(props.tag);
        }).catch(error => {
            props.onDeleteFail(error.message);
            props.onClose();
        })
    }

    return (
        <ConfirmationDialog
            show={props.show}
            onClose={props.onClose}
            onConfirm={handleDeleteTag} />
    )
}

export default DeleteTag;