import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../../utilities/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/**
 * EditCategoryName JSX attribute
 * 
 * show
 * onHide
 * onEdit
 * onEditFail
 * tag 
 * tags
 */
const EditTagLabel = (props) => {
    const [newLabel, setNewLabel] = useState('');
    const [isInvalidTag, setIsInvalidTag] = useState(false);

    useEffect(() => {
        setNewLabel(props.tag.label);
    }, [props.tag.label])

    const handleLabelChange = (event) => {
        setNewLabel(event.target.value);
    }

    // Handle when the modal's close button is clicked
    const handleOnHide = () => {
        // Set the tag name field's value back to the original tag name 
        // since no edit action is actually performed
        setNewLabel(props.tag.label);
        handleOnClose();
    }

    // Handle when the modal disappears
    const handleOnClose = () => {
        setIsInvalidTag(false);
        props.onHide();
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const newName = newLabel.trim();
        const length = newName.length;
        const isInvalidLength = length === 0 || length > 60;

        const isExist = props.tags.find(tag => tag.label === newName) !== undefined
            && newName !== props.tag.label;
        if (isInvalidLength || isExist) {
            setIsInvalidTag(true);
            return;
        }

        axios.put(`/categories/${props.tag.id}`, {
            category: {
                label: newName
            }
        }).then(result => {
            setNewLabel(result.data.label);
            props.onEdit(result.data);
        }).catch(error => {
            setNewLabel(props.tag.label);
            props.onEditFail(error.message);
        }).finally(() => {
            handleOnClose();
        })
    }

    return (
        <Modal show={props.show} onHide={handleOnHide} size="sm">
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