import React, { useState, useEffect } from 'react';
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
 * Represents the task form.
 * 
 * TaskForm JSX attribute (API)
 * content: an optional task object that is passed to prefill the task form. The task object contains
 *          title and description.
 * onSubmit: function that will be triggered when the submit button is clicked.
 */
const TaskForm = (props) => {
    //================================================ Initialisation =================================================
    // The name of the keys here must be the same as those of the task object passed in
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

        // Change the name of the key "name" to "label" of the tag object
        initialContent.tags = initialContent.tags.map(tag => {
            return {
                id: tag.id,
                label: tag.name
            }
        });
    }

    const [title, setTitle] = useState(initialContent.title);
    const [description, setDescription] = useState(initialContent.description);
    const [selectedTags, setSelectedTags] = useState(initialContent.tags);
    const [isInvalidTag, setIsInvalidTag] = useState(false);

    //============================================== Handle Input Change ==============================================

    const handleTitleChanged = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChanged = (event) => {
        setDescription(event.target.value);
    };

    const handleTagsChanged = (selections) => {
        console.log(selections);
        setIsInvalidTag(false);
        if (selections.length === 0) {
            setSelectedTags(selections);
            return;
        }

        let length = selections.length;
        const newItem = selections[length - 1];

        const isNewTag = props.tagsProps.tags.find(tag => tag.label === newItem.label) === undefined;
        if (isNewTag) {
            console.log("U");
            axios.post('/categories', {
                category: { name: newItem.label }
            }).then((result) => {
                const newTag = {
                    id: result.data.id,
                    label: result.data.name
                }
                selections.splice(length - 1, 1, newTag);
                props.tagsProps.onNewTagCreated(newTag);
            })
        }

        const isDuplicate = selections.filter(tag => tag.label === newItem.label).length > 1;
        console.log(isDuplicate);
        if (isDuplicate) {
            selections.splice(length - 1);
            setIsInvalidTag(true);
        }

        setSelectedTags(selections);
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
            description: description.trim(),
            category_ids: selectedTags.map(tag => tag.id)
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
                    clearButton
                    maxHeight='110px'
                    isInvalid={isInvalidTag}
                    multiple={true}
                    options={props.tagsProps.tags}
                    allowNew
                    newSelectionPrefix="Create new tag: "
                    onChange={handleTagsChanged}
                    selected={selectedTags} />
                <Form.Control.Feedback type="invalid" style={isInvalidTag ? { display: "block" } : {}}>
                    Cannot create tag that already exists
                </Form.Control.Feedback>
            </FormGroup>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
};

export default TaskForm;