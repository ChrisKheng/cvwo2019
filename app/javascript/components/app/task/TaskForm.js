import React, { useState } from 'react';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Button from "react-bootstrap/Button";

// To insert crsf token into every axios HTTP request so that Rails API won't complain that
// there's no CSRF token when submitting the form.
const csrfToken = document.querySelector('[name=csrf-token]').content;
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

const TaskForm = (props) => {
    //================================================ Initialisation =================================================
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

    //============================================== Handle Input Change ==============================================
    const [title, setTitle] = useState(initialContent.title);
    const [description, setDescription] = useState(initialContent.description);

    const handleTitleChanged = (event) => {
        setTitle(event.target.value);
    }

    const handleDescriptionChanged = (event) => {
        setDescription(event.target.value);
    }

    //========================================= Handle Submit and Validation ==========================================
    const [isTitleInvalid, setIsTitleInvalid] = useState(false);
    const [isDescriptionInvalid, setIsDescriptionInvalid] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const task = {
            title: title.trim(),
            description: description.trim()
        }

        if (validateForm(task)) {
            props.onSubmit(task);
        }
    }

    const validateForm = (task) => {
        let errorCount = 0;

        // Reset validation state
        setIsTitleInvalid(false);
        setIsDescriptionInvalid(false);

        if (task.title.length === 0) {
            setIsTitleInvalid(true);
            errorCount++;
        }

        if (task.description.length === 0) {
            setIsDescriptionInvalid(true);
            errorCount++;
        }

        return errorCount === 0;    
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Title" value={title} onChange={handleTitleChanged}
                    isInvalid={isTitleInvalid} />
                <Form.Control.Feedback type="invalid">Title cannot be empty</Form.Control.Feedback>
            </FormGroup>

            <FormGroup>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows="5" placeholder="Description" value={description}
                    onChange={handleDescriptionChanged}
                    isInvalid={isDescriptionInvalid}/>
                <Form.Control.Feedback type="invalid">Description cannot be empty</Form.Control.Feedback>
            </FormGroup>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default TaskForm;