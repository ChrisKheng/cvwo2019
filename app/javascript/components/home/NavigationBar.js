import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";

/**
 * Represents the navigation bar of the product website.
 */
const NavigationBar = () => {
    return (
        <Navbar variant="dark" bg="dark" expand="lg">
            <Navbar.Brand as={Link} to="/">DoIT</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/about">About</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default NavigationBar;