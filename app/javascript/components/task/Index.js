import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";

class Index extends React.Component {
    state = {
        tasks: []
    }

    // To initialise state
    constructor(props) {
        super(props);
        this.state.tasks = props.tasks;
    }

    render() {
        return (
            <React.Fragment>
                <CardDeck>
                    {this.state.tasks.map((task) => {
                        return (
                            <Card key={task.id}>
                                <Card.Body>
                                    <Card.Title>{task.title}</Card.Title>
                                    <Card.Text>{task.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </CardDeck>
            </React.Fragment>
        )
    }
}

export default Index