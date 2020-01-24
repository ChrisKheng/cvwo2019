import React, { useState } from 'react';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Button from "react-bootstrap/Button";
import { Typeahead } from "react-bootstrap-typeahead";

// To insert crsf token into every axios HTTP request so that Rails API won't complain that
// there's no CSRF token when submitting the form.
const csrfToken = document.querySelector('[name=csrf-token]').content;
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

/**
 * A form for creating or editing a task.
 * 
 * props properties
 * content: An optional task object that is passed to prefill the task form.
 * tagsProps: An object consisting utilities for operations related to tags, see documentation in Task component.
 * onSubmit: A function that is triggered when the submit button of the form is clicked.
 * onNewTagCreated: A function that is triggered when a new tag is created.
 * onNewTagFail: A function that is triggered when creating a new tag fails.
 */
const TaskForm = (props) => {
    //================================================ Initialisation =================================================
    // The name of the keys here must be the same as those of the task object passed in.
    // initialContent is used to give some initial values to the following fields to prevent them
    // from being undefined in the component.
    const initialContent = {
        title: '',
        description: '',
        tags: []
    };

    // Initialisation of the form content if given
    if (props.hasOwnProperty('content')) {
        Object.keys(props.content).forEach(key => {
            initialContent[key] = props.content[key];
        })
    }

    // title, description, selectedTags are state objects used to track the values of the input fields of the form.
    // isCreatingTag is used to synchronise between creating tag action and submitting form action.
    const [title, setTitle] = useState(initialContent.title);
    const [description, setDescription] = useState(initialContent.description);
    const [selectedTags, setSelectedTags] = useState(initialContent.tags);
    const [isTagInvalid, setIsTagInvalid] = useState(false);
    const [isCreatingTag, setIsCreatingTag] = useState(false);

    //============================================== Handle Input Change ==============================================
    const handleTitleChanged = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChanged = (event) => {
        setDescription(event.target.value);
    };

    // selections is the user's selected tag objects sent by the react-bootstrap-typeahead component.
    const handleTagsChanged = (selections) => {
        setIsTagInvalid(false);

        let length = selections.length;

        // If length is 0, operations after this if statement don't have to be performed.
        if (length === 0) {
            setSelectedTags([]);
            return;
        }

        // Checks the validity of newItem, which is the added tag.
        const newItem = selections[length - 1];
        const isDuplicate = selections.filter(tag => tag.label === newItem.label).length > 1;
        const isExceedLength = newItem.label.length > 60;
        if (isDuplicate || isExceedLength) {
            selections.splice(length - 1, 1);
            setSelectedTags(selections);
            setIsTagInvalid(true);
            return;
        }

        // If the added tag is a tag that hasn't existed, send a POST request to the server with the new tag object
        // to create the tag and perform necessary follow-up actions.
        const isNewTag = props.tagsProps.tags.find(tag => tag.label === newItem.label) === undefined;
        if (isNewTag) {
            // Disables the submit button of the form
            setIsCreatingTag(true);

            axios.post('/categories', {
                category: { label: newItem.label }
            }).then((result) => {
                // Update the added tag object with the tag object sent by the server
                // in user selections for both the typeahead component and the internal state.
                selections.splice(length - 1, 1, result.data);
                setSelectedTags(selections);
                props.tagsProps.onNewTagCreated(result.data);
            }).catch(error => {
                // Remove the added tag object from the user selections for the typeahead component.
                selections.splice(length - 1, 1);
                props.tagsProps.onNewTagFail(error.message);
            }).finally(() => {
                // Re-enables the submit button of the form
                setIsCreatingTag(false);
            })
        } else {
            // The added tag is a tag that already exists.
            setSelectedTags(selections);
        }
    }

    //========================================= Handle Submit and Validation ==========================================
    const [isTitleInvalid, setIsTitleInvalid] = useState(false);
    const [isDescriptionInvalid, setIsDescriptionInvalid] = useState(false);

    /**
     * Triggers the onSubmit task function which is passed to TaskForm as props.
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        const task = {
            title: title.trim(),
            description: description.trim(),
            category_ids: selectedTags.map(tag => tag.id)
        }

        if (validateForm(task)) {
            props.onSubmit(task);
        }
    };

    /**
     * Validates the content of task form by checking the task object passed in.
     */
    const validateForm = (task) => {
        let errorCount = 0;

        // Resets validation state.
        setIsTitleInvalid(false);
        setIsDescriptionInvalid(false);
        setIsTagInvalid(false);

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
                    value={title}
                    onChange={handleTitleChanged}
                    isInvalid={isTitleInvalid} />
                <Form.Control.Feedback type="invalid" className="custom-invalid-feedback">
                    Title cannot be empty
                </Form.Control.Feedback>
            </FormGroup>

            <FormGroup>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows="4"
                    value={description}
                    onChange={handleDescriptionChanged}
                    isInvalid={isDescriptionInvalid} />
                <Form.Control.Feedback type="invalid" className="custom-invalid-feedback">
                    Description cannot be empty
                </Form.Control.Feedback>
            </FormGroup>

            <FormGroup>
                <Form.Label>Tags</Form.Label>
                <Typeahead
                    clearButton
                    maxHeight='110px'
                    isInvalid={isTagInvalid}
                    multiple={true}
                    options={props.tagsProps.tags}
                    allowNew
                    newSelectionPrefix="Create new tag: "
                    onChange={handleTagsChanged}
                    selected={selectedTags} />
                <Form.Text
                    className="text-muted"
                    style={!isCreatingTag ? {display: "none"} : {}}>
                    Creating tag ...
                </Form.Text>
                <Form.Control.Feedback
                    type="invalid"
                    className="custom-invalid-feedback"
                    style={isTagInvalid ? { display: "block" } : {}}>
                    Cannot create tag that already exists or exceeds 60 characters
                </Form.Control.Feedback>
            </FormGroup>

            <Button variant="primary" type="submit" disabled={isCreatingTag}>
                Submit
            </Button>
        </Form>
    )
};

export default TaskForm;