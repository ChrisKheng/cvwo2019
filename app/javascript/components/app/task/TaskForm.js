import React from 'react';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Button from "react-bootstrap/Button";

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

        this.props.handleFormData(task);
    }

    render() {
        if (this.props.show === false) {
            return null;
        }

        const form = (
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

        return (
            <div className="myModal">
                <section className="modal-main">
                    <button type="button" onClick={this.props.handleShowChanged}>Close</button>
                    <h1>{this.props.title}</h1>
                    {form}
                </section>
            </div>
        )
    }
}

export default TaskForm