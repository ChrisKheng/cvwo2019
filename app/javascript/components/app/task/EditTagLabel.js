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

        const length = newLabel.trim().length;
        if (length === 0 || length > 60) {
            setIsInvalidTag(true);
            return;
        }

        axios.put(`/categories/${props.tag.id}`, {
            category: {
                label: newLabel.trim()
            }
        }).then(result => {
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
                    <Form.Control.Feedback type="invalid">
                        Tag name cannot be empty or exceed 60 characters
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">Change</Button>
            </Form>
        </Modal>
    )
}

export default EditTagLabel;