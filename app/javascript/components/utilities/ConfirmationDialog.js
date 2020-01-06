import React from 'react';
import Modal from "./Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

/**
 * Represents a confirmation dialog.
 * 
 * ConfirmationDialog JSX attributes
 * show = toggle modal visibility (must be provided, either true or false).
 * onClose = function that will be triggered when the No button of the dialog is clicked.
 * onConfirm = function that will be triggered when the Yes button of the dialog is clicked.
 */
const ConfirmationDialog = (props) => {
    return (
        <Modal show={props.show} closeButton={false} size="sm">
            <Container className="text-center dialog">
                <h4>Are you sure?</h4>

                <div>
                    <Button type="button" variant="light" onClick={props.onClose}>No</Button>
                    <Button type="button" variant="primary" onClick={props.onConfirm}>Yes</Button>
                </div>
            </Container>
        </Modal>
    )
};

export default ConfirmationDialog;
