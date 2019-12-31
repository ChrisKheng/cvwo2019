import React from 'react';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Button from "react-bootstrap/Button";
import Modal from "../../utilities/Modal";

// To insert crsf token into every axios HTTP request so that Rails API won't complain that
// there's no CSRF token when submitting the form.
const csrfToken = document.querySelector('[name=csrf-token]').content;
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

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
        const task = {
            title: this.state.title,
            description: this.state.description
        }

        this.props.onSubmit(task);
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