import React from 'react';
import NavigationBar from "../NavigationBar";
import Nav from "react-bootstrap/Nav";

/**
 * Represents the navigation bar above the tasks page.
 * 
 * TaskNavigationBar JSX attributes
 * onClickNewTask = function that will be triggered when the new task button is clicked.
 */
const TaskNavigationBar = (props) => {
    return (
        <NavigationBar>
            <Nav>
                <Nav.Link onClick={props.onClickNewTask}>New Task</Nav.Link>
            </Nav>
        </NavigationBar>
    )
};

export default TaskNavigationBar;