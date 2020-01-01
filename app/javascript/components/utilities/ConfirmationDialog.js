import React from 'react'
import Modal from "./Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const ConfirmationDialog = (props) => {
    return (
        <Modal show={props.show} closeButton={false}>
            <Container className="text-center">
                <h4>Are you sure?</h4>

                <div>
                    <Button type="button" variant="light" onClick={props.onClose}>No</Button>
                    <Button type="button" variant="primary">Yes</Button>
                </div>
            </Container>
        </Modal>
    )
}

export default ConfirmationDialog;
