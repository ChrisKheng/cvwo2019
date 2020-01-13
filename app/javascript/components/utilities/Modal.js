import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";

/**
 * Represents a general modal which can be used by other components.
 * 
 * Modal JSX attribues
 * show = toggle modal visibility (must be provided, either true or false).
 * onHide = function that will be triggered when the close button of modal is clicked.
 * closeButton = toggle button visibility (by default true).
 * size = change the size of the modal (available options: sm).
 */
const Modal = (props) => {
    let closeButton = (
        <FontAwesomeIcon icon={faTimes} onClick={props.onHide} size="lg" />
    );

    let className = "custom-modal".concat(" ", props.className);

    // Toggle modal visibility
    if (!props.show) {
        return null;
    }

    // Toggle close button visibility
    if (props.closeButton !== undefined && !props.closeButton) {
        closeButton = null;
    }

    // Change the size of modal to small
    if (props.size !== undefined && props.size.localeCompare("sm") === 0) {
        className = className.concat(" ", "custom-modal-size-sm");
    }

    return (
        <div className="overlay">
            <section className={className}>
                {closeButton}
                {props.children}
            </section>
        </div>
    )
};

export default Modal;