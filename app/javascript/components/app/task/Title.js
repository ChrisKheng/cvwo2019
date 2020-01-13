import React, { useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Nav from 'react-bootstrap/Nav';
import EditTagLabel from './EditTagLabel';

/**
 * Title JSX attribues
 * 
 * tag: must be provided, an object
 * onEditTag
 */
const Title = (props) => {
    const [isShowEdit, setIsShowEdit] = useState(false);

    let links = null;

    if (props.tag.id !== null) {
        links = (
            <Nav>
                <Nav.Item>
                    <Nav.Link onClick={() => setIsShowEdit(true)}>Edit</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link>Delete</Nav.Link>
                </Nav.Item>
            </Nav>
        )
    }

    console.log(props.tag);

    return (
        <div>
            <Jumbotron>
                <h1>{props.tag.label}</h1>
                {links}
            </Jumbotron>
            <EditTagLabel
                tag={props.tag}
                show={isShowEdit}
                onHide={() => setIsShowEdit(false)}
                onEdit={props.onEditTag} />
        </div>
    )
}

export default Title;