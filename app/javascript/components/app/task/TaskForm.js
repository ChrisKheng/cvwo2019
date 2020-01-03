import React, {useState} from 'react';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Button from "react-bootstrap/Button";

// To insert crsf token into every axios HTTP request so that Rails API won't complain that
// there's no CSRF token when submitting the form.
const csrfToken = document.querySelector('[name=csrf-token]').content;
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

const TaskForm = (props) => {
    const initialContent = {
        title: '',
        description: ''
    }

    // Initialisation of the form content if given
    if (props.hasOwnProperty('content')) {
        Object.keys(props.content).forEach(key => {
            initialContent[key] = props.content[key];
        })
    }

    const[title, setTitle] = useState(initialContent.title);
    const[description, setDescription] = useState(initialContent.description);

    const handleTitleChanged = (event) => {
        setTitle(event.target.value);
    }

    const handleDescriptionChanged = (event) => {
        setDescription(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const task = {
            title: title,
            description: description
        }

        props.onSubmit(task);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Title" value={title} onChange={handleTitleChanged}/>
            </FormGroup>

            <FormGroup>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" row="6" placeholder="Description" value={description}
                              onChange={handleDescriptionChanged}/>
            </FormGroup>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default TaskForm;