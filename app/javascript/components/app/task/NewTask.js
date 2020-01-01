import React from 'react'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskForm from "./TaskForm";
import Modal from "../../utilities/Modal"

class NewTask extends React.Component {
    handleSubmit = (newTask) => {
        // AJAX call
        axios.post("/tasks", {
            task: {...newTask}
        }).then(result => {
                this.props.onNewTaskSuccess(result.data);
            }
        ).catch((error) => {
            this.props.onNewTaskFailure(error.message);
        })
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <h1>New Task</h1>
                <TaskForm onSubmit={this.handleSubmit.bind(this)}/>
            </Modal>
        )
    }
}

export default NewTask