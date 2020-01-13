import React from 'react';
import axios from 'axios';
import ConfirmationDialog from '../../utilities/ConfirmationDialog';

/**
 * DeleteTag JSX attributes
 * 
 * tag
 * show
 * onClose
 * onDelete
 * onDeleteFail
 */
const DeleteTag = (props) => {
    const handleDeleteTag = () => {
        axios.delete(`/categories/${props.tag.id}`)
        .then(result => {
            console.log(result);
            props.onDelete(props.tag);
        }).catch(error => {
            props.onDeleteFail(error.message);
        }).finally(() => {
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