import React from 'react'
import NavigationBar from "../NavigationBar";
import Nav from "react-bootstrap/Nav";

const TaskNavigationBar = (props) => {
    return (
        <NavigationBar>
            <Nav>
                <Nav.Link onClick={props.onClickNewTask}>New Task</Nav.Link>
            </Nav>
        </NavigationBar>
    )
}

export default TaskNavigationBar;