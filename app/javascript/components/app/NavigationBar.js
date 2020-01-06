import React from 'react';
import Navbar from "react-bootstrap/Navbar";

/**
 * Represents the navigation bar of the application.
 */
const NavigationBar = (props) => {
    return (
        <Navbar variant="dark" bg="dark">
            <Navbar.Brand href="/">DoIT</Navbar.Brand>
            {props.children}
        </Navbar>
    )
};

export default NavigationBar;