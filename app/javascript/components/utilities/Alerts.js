import React from 'react';
import Alert from "react-bootstrap/Alert";

const AlertSuccess = (props) => {
    return (
        <Alert variant="success" dismissible show={props.show} onClose={props.handler}>
            {props.children}
        </Alert>
    )
};

const AlertFailure = (props) => {
    return (
        <Alert variant="danger" dismissible show={props.show} onClose={props.handler}>
            {props.children}
        </Alert>
    )
}

export {AlertSuccess, AlertFailure}