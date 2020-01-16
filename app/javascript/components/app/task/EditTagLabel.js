import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from '../../utilities/Modal';

/**
 * A modal dialog for editing the name of a tag.
 * 
 * props properties:
 * tag: The tag object to be edited.
 * tags: An array of tag objects which are already created by the user.
 * show: A boolean which shows the edit tag dialog if set to true.
 * onClose: A function which is triggered when the close button of the dialog is clicked.
 * onEdit: A function which is triggered when the tag is successfully edited, i.e. a success message is sent by the
 *         server.
 * onEditFail: A function which is triggered when editing the tag fails, e.g. due to internet connection.
 */
const EditTagLabel = (props) => {
    // newLabel: A string state object which is used to track the name typed by the user in the dialog.
    const [newLabel, setNewLabel] = useState('');
    const [isInvalidTag, setIsInvalidTag] = useState(false);

    // To pre-fill the name field of the form with the name of the tag
    useEffect(() => {
        setNewLabel(props.tag.label);
    }, [props.tag.label])

    // Handles change in input
    const handleLabelChange = (event) => {
        setNewLabel(event.target.value);
    }

    // Handles the situation when the modal's close button is clicked
    const handleOnClose = () => {
        // Set the tag name field's value back to the original tag name 
        // since no edit action is actually performed
        setNewLabel(props.tag.label);
        handleOnHide();
    }

    // Handles the situation when the modal disappears
    const handleOnHide = () => {
        setIsInvalidTag(false);
        props.onClose();
    }

    // Handles the situation when the submit button of the dialog is clicked.
    const handleSubmit = (event) => {
        event.preventDefault();

        // Perform validation
        // isExist: True if the tagname of the edited tag already exists, i.e. same with the 
        //          name of other tags. 
        const newName = newLabel.trim();
        const length = newName.length;
        const isInvalidLength = length === 0 || length > 60;
        const isExist = props.tags.find(tag => tag.label === newName) !== undefined
            && newName !== props.tag.label;

        if (isInvalidLength || isExist) {
            setIsInvalidTag(true);
            return;
        }

        // Send a PUT request to the server with the edited tag object as a category object.
        // After that, performs follow-up action accordingly and closes the dialog.
        axios.put(`/categories/${props.tag.id}`, {
            category: {
                label: newName
            }
        }).then(result => {
            // Updates the name field of the dialog with the name of the tag sent back by the server.
            setNewLabel(result.data.label);
            props.onEdit(result.data);
        }).catch(error => {
            // Set the name field of the dialog back to the original name of the tag.
            setNewLabel(props.tag.label);
            props.onEditFail(error.message);
        }).finally(() => {
            handleOnHide();
        })
    }

    return (
        <Modal show={props.show} onClose={handleOnClose} size="sm">
            <h4>Edit Tag</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control
                        value={newLabel}
                        onChange={handleLabelChange}
                        isInvalid={isInvalidTag} />
                    <Form.Control.Feedback type="invalid" className="custom-invalid-feedback">
                        Tag name cannot be empty, exceed 60 characters, or already exists
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">Change</Button>
            </Form>
        </Modal>
    )
}

export default EditTagLabel;