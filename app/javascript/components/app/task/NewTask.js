import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from "react-bootstrap/Modal";
import TaskForm from "./TaskForm";
import axios from "axios";

class NewTask extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

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
        const showHideClassName = this.props.show ? "myModal display-block" : "myModal display-none";
        return (
            <div className={showHideClassName}>
                <section className="modal-main">
                    <button type="button" onClick={this.props.handleShowChanged}/>
                    <TaskForm/>
                </section>
            </div>
        )
    }
}

export default NewTask