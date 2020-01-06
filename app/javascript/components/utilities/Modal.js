import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";

const Modal = (props) => {
    let closeButton = (
        <FontAwesomeIcon icon={faTimes} onClick={props.onHide} size="lg"/>
    )
    let className = "custom-modal"

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
}

export default Modal