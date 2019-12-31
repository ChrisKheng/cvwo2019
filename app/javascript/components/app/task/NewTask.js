import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskForm from "./TaskForm";
import axios from "axios";

class NewTask extends React.Component {
    handleSubmit = (newTask) => {
        // AJAX call
        axios.post("/tasks", {
            task: {...newTask}
        }).then(result => {
                this.props.handleNewTask(result.data);
            }
        ).catch();
    }

    render() {
        return (
            <TaskForm title="New Task" show={this.props.show} handleShowChanged={this.props.handleShowChanged}
                handleFormData={this.handleSubmit.bind(this)}/>
        )
    }
}

export default NewTask