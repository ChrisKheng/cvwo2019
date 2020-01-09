import React, { useState } from 'react';
import axios from 'axios';
import CardColumns from "react-bootstrap/CardColumns";
import Card from "react-bootstrap/Card";
import ConfirmationDialog from "../../utilities/ConfirmationDialog";
import EditTask from "./EditTask";

/**
 * Represents the list of displayed tasks.
 * 
 * TasksList JSX attributes
 * tasks: an array of tasks that will be displayed in the tasklist.
 * onEdit: function that will be triggered when a task is edited successfully.
 * onEditFailure: function that will be triggered when editing a task fails.
 * onDelete: function that will be triggered when a task is deleted successfully.
 * onDeleteFailure: function that will be triggered when deleting a task fails.
 */
const TasksList = (props) => {
    const [isShowEditDialog, setEditDialogVisibility] = useState(false);
    const [task, setTask] = useState(null);
    const [isShowDeleteDialog, setDeleteDialogVisibility] = useState(false);
    const [taskId, setTaskId] = useState(null);

    /**
     * Fires up the edit task form modal.
     */
    const onEditClicked = (task) => {
        setTask(task);
        setEditDialogVisibility(true);
    };

    /**
     * Fires up the delete task confirmation dialog modal.
     */
    const onDeleteClicked = (id) => {
        setTaskId(id);
        setDeleteDialogVisibility(true);
    };

    /**
     * Sends a DELETE request to the app server.
     * After that, performs follow up actions accordingly and closes the delete dialog.
     */
    const onDeleteConfirmed = (id) => {
        axios.delete(`tasks/${id}`)
            .then(() => {
                props.onDelete(id);
            }
            ).catch((error) => {
                props.onDeleteFailure(error.message);
            }
            ).finally(() => {
                setDeleteDialogVisibility(false);
            }
            )
    };

    let cards = null;

    // Display the tasks if any
    if (props.tasks !== undefined) {
        cards = props.tasks.map((task) => {
            let tags = null;
            if (task.tags.length !== 0) {
                const categories = `Tags: ${task.tags.map(tag => tag.name).join(", ")}`;
                tags = (
                    <Card.Footer className="text-muted">
                        <small>{categories}</small>
                    </Card.Footer>
                )
            }

            return (
                <Card key={task.id}>
                    <Card.Body>
                        <Card.Title>{task.title}</Card.Title>
                        <Card.Text>{task.description}</Card.Text>
                        <Card.Link className="text-primary" onClick={() => onEditClicked(task)}>Edit</Card.Link>
                        <Card.Link className="text-primary" onClick={() => onDeleteClicked(task.id)}>Delete</Card.Link>
                    </Card.Body>
                    {tags}
                </Card>
            )
        })
    }

    return (
        <div>
            <CardColumns className="dashboard">
                {cards}
            </CardColumns>
            <EditTask
                tagsProps = {props.tagsProps}
                show={isShowEditDialog}
                onHide={() => setEditDialogVisibility(false)}
                onEdit={props.onEdit}
                onEditFailure={props.onEditFailure}
                task={task} />
            <ConfirmationDialog
                show={isShowDeleteDialog}
                onClose={() => setDeleteDialogVisibility(false)}
                onConfirm={() => onDeleteConfirmed(taskId)} />
        </div>
    )
};

export default TasksList;