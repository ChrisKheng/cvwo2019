import React from 'react';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Button from "react-bootstrap/Button";

const csrfToken = document.querySelector('[name=csrf-token]').content
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

class TaskForm extends React.Component {
    state = {
        title: '',
        description: ''
    }

    handleTitleChanged = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    handleDescriptionChanged = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3000/tasks", {
            task: {...this.state}
        }).then(result => {
            console.log(result);
            }
        )
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Title" onChange={this.handleTitleChanged}/>
                </FormGroup>

                <FormGroup>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="textarea" placeholder="Description" onChange={this.handleDescriptionChanged}/>
                </FormGroup>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
}

export default TaskForm