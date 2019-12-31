import React from 'react';
import CardColumns from "react-bootstrap/CardColumns";
import Card from "react-bootstrap/Card";

const TaskList = (props) => {
    let cards = null;

    if (props.tasks !== undefined) {
        cards = props.tasks.map((task) => {
            return (
                <Card key={task.id}>
                    <Card.Body>
                        <Card.Title>{task.title}</Card.Title>
                        <Card.Text>{task.description}</Card.Text>
                        <Card.Link href="">Delete</Card.Link>
                    </Card.Body>
                </Card>
            )
        })
    }

    return (
        <CardColumns className="dashboard">
            {cards}
        </CardColumns>
    )
}

export default TaskList;