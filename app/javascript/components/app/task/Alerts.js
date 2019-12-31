import React from 'react';
import {AlertSuccess} from "../../utilities/Alerts"

const AlertTaskSuccess = (props) => {
    return (
        <AlertSuccess {...props}>
            New task is saved!
        </AlertSuccess>
    )
}

export {AlertTaskSuccess};