import React from 'react';
import axios from 'axios';
import Modal from "../../utilities/Modal";
import TaskForm from "./TaskForm";

const EditTask = (props) => {
    return (
        <Modal show={props.show} onHide={props.onHide}>
            <h1>Edit Task</h1>
            <TaskForm content={{...props.task}}/>
        </Modal>
    )
}

export default EditTask;