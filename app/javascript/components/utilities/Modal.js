import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";

const Modal = (props) => {
    let closeButton = (
        <FontAwesomeIcon icon={faTimes} onClick={props.onHide} size="lg"/>
    )

    if (!props.show) {
        return null;
    }

    if (props.closeButton !== undefined && !props.closeButton) {
        console.log(props.closeButton);
        closeButton = null;
    }

    return (
        <div className="overlay" onClick={props.onHide}>
            <section className="custom-modal">
                {closeButton}
                {props.children}
            </section>
        </div>
    )
}

export default Modal