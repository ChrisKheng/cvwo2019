import React from 'react';
import {Link} from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import NavDropDown from "react-bootstrap/NavDropdown";
import NavigationBar from "../NavigationBar";

/**
 * The navigation bar above the tasks page.
 * 
 * props properties
 * tags: An array of tags which are created by the user.
 * onClickNewTask = A function that is triggered when the new task button is clicked.
*/
const TaskNavigationBar = (props) => {
    // Display tags if any
    let tags = null;
    const haveAnyTags = props.tags !== undefined || props.tags !== null;
    if (haveAnyTags) {
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