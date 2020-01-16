import React, { useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Nav from 'react-bootstrap/Nav';
import EditTagLabel from './EditTagLabel';
import DeleteTag from './DeleteTag';

/**
 * A jumbotron which displays the title of the master tasks page and filter tasks page as well as some tag actions.
 * Master tasks page refers to the page which displays all the tasks.
 * Filter tasks page refers to the page which displays tasks that belong to a tag.
 * 
 * props properties
 * tag: A tag object used to display the title of the page. For master tasks page, the id of the tag object needs to
 *      be null and the label of the tag object is the title of the page.
 * tags: An array of tags which are created by the user.
 * onEditTag: A function which is triggered when a tag is edited successfully.
 * onEditTagFail: A function which is triggered when editing a tag fails.
 * onDeleteTag: A function which is triggered when a tag is deleted successfully.
 * onDeleteTagFail: A function which is triggered when deleting a tag fails.
 */
const Title = (props) => {
    const [isShowEditForm, setIsShowEditForm] = useState(false);
    const [isShowDeleteDialog, setIsShowDeleteDialog] = useState(false);

    // links refers to the edit tag link and delete tag link
    let links = null;

    // Displays links if the page is filter tasks page.
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
                tags={props.tags}
                show={isShowEditForm}
                onClose={() => setIsShowEditForm(false)}
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