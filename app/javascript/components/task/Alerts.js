import React from 'react';
import Alert from "react-bootstrap/Alert";

const AlertNewTaskSuccess = (props) => {
    return (
        <Alert variant="success" dismissible show={props.show} onClose={props.handler}>
            New task is saved!
        </Alert>
    )
};

export {AlertNewTaskSuccess};