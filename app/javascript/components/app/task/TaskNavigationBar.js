import React from 'react';
import {Link} from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import NavDropDown from "react-bootstrap/NavDropdown";
import NavigationBar from "../NavigationBar";

/**
 * Represents the navigation bar above the tasks page.
 * 
 * TaskNavigationBar JSX attributes
 * onClickNewTask = function that will be triggered when the new task button is clicked.
*/
const TaskNavigationBar = (props) => {
    let tags = null;
    if (props.tags !== undefined || props.tags !== null) {
        tags = props.tags.map(tag => {
            return (
                <NavDropDown.Item key={tag.id} as={Link} to={`/app/tasks/tags/${tag.id}`}>
                    {tag.label}
                </NavDropDown.Item>
            )
        })
    }

    return (
        <NavigationBar>
            <Nav className="mr-auto">
                <Nav.Link onClick={props.onClickNewTask}>New Task</Nav.Link>
                <NavDropDown title="Filter" id="basic-nav-dropdown">
                    <NavDropDown.Item as={Link} to="/app/tasks">All Tasks</NavDropDown.Item>
                    {tags}
                </NavDropDown>
            </Nav>
        </NavigationBar>
    )
};

export default TaskNavigationBar;