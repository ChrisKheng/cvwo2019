import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Nav } from 'react-bootstrap';

/**
 * Title JSX attribues
 * 
 * tag: must be provided, an object
 */
const Title = (props) => {
    let links = null;

    if (props.tag.id !== null) {
        links = (
            <Nav>
                <Nav.Item>
                    <Nav.Link>Edit</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link>Delete</Nav.Link>
                </Nav.Item>
            </Nav>
        )
    }

    return (
        <Jumbotron>
            <h1>{props.tag.name}</h1>
            {links}
        </Jumbotron>
    )    
}

export default Title;