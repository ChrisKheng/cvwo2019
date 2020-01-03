import React, { useState } from 'react';
import axios from 'axios';
import CardColumns from "react-bootstrap/CardColumns";
import Card from "react-bootstrap/Card";
import ConfirmationDialog from "../../utilities/ConfirmationDialog";
import EditTask from "./EditTask";

const TaskList = (props) => {
    const [isShowEditDialog, setEditDialogVisibility] = useState(false);
    const [task, setTask] = useState(null);
    const [isShowDeleteDialog, setDeleteDialogVisibility] = useState(false);
    const [taskId, setTaskId] = useState(null);

    const onEditClicked = (task) => {
        setTask(task);
        setEditDialogVisibility(true);
    }

    const onDeleteClicked = (id) => {
        setTaskId(id);
        setDeleteDialogVisibility(true);
    }

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
    }

    let cards = null;

    if (props.tasks !== undefined) {
        cards = props.tasks.map((task) => {
            return (
                <Card key={task.id}>
                    <Card.Body>
                        <Card.Title>{task.title}</Card.Title>
                        <Card.Text>{task.description}</Card.Text>
                        <Card.Link className="text-primary" onClick={() => onEditClicked(task)}>Edit</Card.Link>
                        <Card.Link className="text-primary" onClick={() => onDeleteClicked(task.id)}>Delete</Card.Link>
                    </Card.Body>
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
                show={isShowEditDialog}
                onHide={() => setEditDialogVisibility(false)}
                onEdit={props.onEdit}
                onEditFail={props.onEditFail}
                task={task} />
            <ConfirmationDialog
                show={isShowDeleteDialog}
                onClose={() => setDeleteDialogVisibility(false)}
                onConfirm={() => onDeleteConfirmed(taskId)} />
        </div>
    )
}

export default TaskList;