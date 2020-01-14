import React, { useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Nav from 'react-bootstrap/Nav';
import EditTagLabel from './EditTagLabel';
import DeleteTag from './DeleteTag';

/**
 * Title JSX attribues
 * 
 * tag: must be provided, an object
 * onEditTag
 */
const Title = (props) => {
    const [isShowEditForm, setIsShowEditForm] = useState(false);
    const [isShowDeleteDialog, setIsShowDeleteDialog] = useState(false);

    let links = null;

    if (props.tag.id !== null) {
        links = (
            <Nav className="tag-nav">
                <Nav.Item>
                    <Nav.Link onClick={() => setIsShowEditForm(true)}>Edit</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link onClick={() => setIsShowDeleteDialog(true)}>Delete</Nav.Link>
                </Nav.Item>
            </Nav>
        )
    }

    return (
        <div>
            <Jumbotron id="tag-title">
                <h1>{props.tag.label}</h1>
                {links}
            </Jumbotron>

            <EditTagLabel
                tag={props.tag}
                show={isShowEditForm}
                onHide={() => setIsShowEditForm(false)}
                onEdit={props.onEditTag}
                onEditFail={props.onEditTagFail} />

            <DeleteTag
                tag={props.tag}
                show={isShowDeleteDialog}
                onClose={() => setIsShowDeleteDialog(false)}
                onDelete={props.onDeleteTag}
                onDeleteFail={props.onDeleteTagFail}/>    
        </div>
    )
}

export default Title;