import React, {useState} from 'react';
import CardColumns from "react-bootstrap/CardColumns";
import Card from "react-bootstrap/Card";
import ConfirmationDialog from "../../utilities/ConfirmationDialog";

const TaskList = (props) => {
    const[isShowDeleteDialog, setDeleteDialogVisibility] = useState(false);

    let cards = null;

    if (props.tasks !== undefined) {
        cards = props.tasks.map((task) => {
            return (
                <Card key={task.id}>
                    <Card.Body>
                        <Card.Title>{task.title}</Card.Title>
                        <Card.Text>{task.description}</Card.Text>
                        <Card.Link className="text-primary" onClick={() => setDeleteDialogVisibility(true)}>Delete</Card.Link>
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
            <ConfirmationDialog show={isShowDeleteDialog}
                                onClose={() => setDeleteDialogVisibility(false)}/>
        </div>
    )
}

export default TaskList;