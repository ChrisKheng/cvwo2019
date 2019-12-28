import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskForm from "./TaskForm";

class NewTask extends React.Component {
    render() {
        return (
            <div>
                <h1>New Task</h1>
                <TaskForm/>
            </div>
        )
    }
}

export default NewTask