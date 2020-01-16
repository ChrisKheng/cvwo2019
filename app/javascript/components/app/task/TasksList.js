import React, { useState } from 'react';
import CardColumns from "react-bootstrap/CardColumns";
import Card from "react-bootstrap/Card";
import EditTask from "./EditTask";
import DeleteTask from './DeleteTask';

/**
 * A list of displayed tasks.
 * 
 * props properties
 * tasks: An array of tasks that will be displayed in the tasklist.
 * tagsProps: An object consisting utilities for operations related to tags, see documentation in Tasks component.
 * onEdit: A function that is triggered when a task is edited successfully.
 * onEditFail: A function that is triggered when editing a task fails.
 * onDelete: A function that is triggered when a task is deleted successfully.
 * onDeleteFail: A function that is triggered when deleting a task fails.
 */
const TasksList = (props) => {
    // task and taskId are state objects used to dynamically set the task object and task id passed to
    // the EditTask and deleteTask dialog respectively.
    const [isShowEditDialog, setEditDialogVisibility] = useState(false);
    const [task, setTask] = useState(null);
    const [isShowDeleteDialog, setDeleteDialogVisibility] = useState(false);
    const [taskId, setTaskId] = useState(null);

    /**
     * Passes the respective task object to the EditTaskDialog and makes the dialog visible. 
     */
    const onEditClicked = (task) => {
        setTask(task);
        setEditDialogVisibility(true);
    };

    /**
     * Passes the respective task id to the DeleteTaskDialog and makes the dialog visible. 
     */
    const onDeleteClicked = (id) => {
        setTaskId(id);
        setDeleteDialogVisibility(true);
    };


    // Display tasks if any
    let cards = null;
    if (props.tasks !== undefined) {
        cards = props.tasks.map((task) => {
            // Display the tags if any by joining the tags' name with comma
            let tags = null;
            const haveAnyTag = task.tags.length !== 0;

            if (haveAnyTag) {
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