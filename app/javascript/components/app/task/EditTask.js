import React from 'react';
import axios from 'axios';
import Modal from "../../utilities/Modal";
import TaskForm from "./TaskForm";

const EditTask = (props) => {
    const onSubmit = (editedTask) => {
        axios.put(`tasks/${props.task.id}`, editedTask)
            .then(result => {
                props.onEdit(result.data);
            })
            .catch(error => {
                props.onEditFail(error.message);
            })
            .finally(() => {
                props.onHide();
            })
    }

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <h1>Edit Task</h1>
            <TaskForm content={{...props.task}}
            onSubmit={onSubmit}/>
        </Modal>
    )
}

export default EditTask;