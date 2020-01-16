import React, { useState } from 'react';
import CardColumns from "react-bootstrap/CardColumns";
import Card from "react-bootstrap/Card";
import EditTask from "./EditTask";
import DeleteTask from './DeleteTask';

/**
 * Represents the list of displayed tasks.
 * 
 * TasksList JSX attributes
 * tasks: an array of tasks that will be displayed in the tasklist.
 * onEdit: function that will be triggered when a task is edited successfully.
 * onEditFail: function that will be triggered when editing a task fails.
 * onDelete: function that will be triggered when a task is deleted successfully.
 * onDeleteFail: function that will be triggered when deleting a task fails.
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


    // Display the tasks if any
    let cards = null;
    if (props.tasks !== undefined) {
        cards = props.tasks.map((task) => {
            // Display the tags if any
            let tags = null;
            if (task.tags.length !== 0) {
                const categories = `Tags: ${task.tags.map(tag => tag.label).join(", ")}`;
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
                task={task}
                tagsProps = {props.tagsProps}
                show={isShowEditDialog}
                onClose={() => setEditDialogVisibility(false)}
                onEdit={props.onEdit}
                onEditFail={props.onEditFail}/>

            <DeleteTask
                id={taskId}
                show={isShowDeleteDialog}
                onClose={() => setDeleteDialogVisibility(false)}
                onDelete={props.onDelete}
                onDeleteFail={props.onDeleteFail}/>
        </div>
    )
};

export default TasksList;