import React from 'react'
import Navbar from "react-bootstrap/Navbar";

const NavigationBar = (props) => {
    return (
        <Navbar variant="dark" bg="dark">
            <Navbar.Brand href="/">DoIT</Navbar.Brand>
            {props.children}
        </Navbar>
    )
}

export default NavigationBar