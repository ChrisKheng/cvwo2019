import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Button from "react-bootstrap/Button";
import {Typeahead} from "react-bootstrap-typeahead";

// To insert crsf token into every axios HTTP request so that Rails API won't complain that
// there's no CSRF token when submitting the form.
const csrfToken = document.querySelector('[name=csrf-token]').content;
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

/**
 * Represents the task form.
 * 
 * TaskForm JSX attribute (API)
 * content: an optional task object that is passed to prefill the task form. The task object contains
 *          title and description.
 * onSubmit: function that will be triggered when the submit button is clicked.
 */
const TaskForm = (props) => {
    //================================================ Initialisation =================================================
    const initialContent = {
        title: '',
        description: ''
    };

    // Initialisation of the form content if given
    if (props.hasOwnProperty('content')) {
        Object.keys(props.content).forEach(key => {
            initialContent[key] = props.content[key];
        })
    }

    const [title, setTitle] = useState(initialContent.title);
    const [description, setDescription] = useState(initialContent.description);
    const selectedTags = [];

    //============================================== Handle Input Change ==============================================

    const handleTitleChanged = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChanged = (event) => {
        setDescription(event.target.value);
    };

    const handleTagsChanged = (selections) => {
        let length = selections.length;
        const newItem = selections[length - 1];

        if (typeof newItem === 'object') {
            axios.post('/categories', {
                category: {name: newItem.label}
            }).then((result) => {
                selections.splice(length - 1, 1, result.data.name);
                props.tagsProps.onNewTagCreated(result.data.name);
            })
        }
    }

    //========================================= Handle Submit and Validation ==========================================
    const [isTitleInvalid, setIsTitleInvalid] = useState(false);
    const [isDescriptionInvalid, setIsDescriptionInvalid] = useState(false);

    /**
     * Triggers onSubmit task function which is passed to the TaskForm.
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        const task = {
            title: title.trim(),
            description: description.trim()
        }

        if (validateForm(task)) {
            props.onSubmit(task);
        }
    };

    const validateForm = (task) => {
        let errorCount = 0;

        // Resets validation state.
        setIsTitleInvalid(false);
        setIsDescriptionInvalid(false);

        // Checks if the task's title is empty.
        if (task.title.length === 0) {
            setIsTitleInvalid(true);
            errorCount++;
        }

        // CHecks if the task's description is empty.
        if (task.description.length === 0) {
            setIsDescriptionInvalid(true);
            errorCount++;
        }

        return errorCount === 0;
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={handleTitleChanged}
                    isInvalid={isTitleInvalid} />
                <Form.Control.Feedback type="invalid">Title cannot be empty</Form.Control.Feedback>
            </FormGroup>

            <FormGroup>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows="4"
                    placeholder="Description"
                    value={description}
                    onChange={handleDescriptionChanged}
                    isInvalid={isDescriptionInvalid} />
                <Form.Control.Feedback type="invalid">Description cannot be empty</Form.Control.Feedback>
            </FormGroup>

            <FormGroup>
                <Form.Label>Tag</Form.Label>
                <Typeahead
                id="tag-typahead"
                clearButton
                maxHeight='110px'
                multiple={true}
                options={props.tagsProps.tags}
                allowNew
                newSelectionPrefix="Create new tag: "
                onChange={handleTagsChanged}
                selected={selectedTags}/>
            </FormGroup>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
};

export default TaskForm;