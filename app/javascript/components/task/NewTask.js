import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskForm from "./TaskForm";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

class NewTask extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (newTask) => {
        axios.post("/tasks", {
            task: {...newTask}
        }).then(result => {
                this.props.handleNewTask(result.data);
            }
        ).catch();
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleShowChanged}>
                <Modal.Header closeButton>
                    <Modal.Title>New Task</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <TaskForm handler={this.handleSubmit}/>
                </Modal.Body>
            </Modal>
        )
    }
}

export default NewTask