import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import NavigationBar from "./NavigationBar";
import NewTask from "./NewTask";
import {AlertNewTaskSuccess} from "./Alerts";

class Index extends React.Component {
    state = {
        tasks: [],
        showNewTask: false,
        showNewTaskSuccess: false
    }

    // To initialise state
    constructor(props) {
        super(props);
        this.state.tasks = props.tasks;
    }

    handleOnClick = () => {
        this.setState({showNewTask: !this.state.showNewTask});
    }

    handleNewTaskSubmitted = (task) => {
        const newTasks = [...this.state.tasks];
        newTasks.push(task);
        this.setState({
            tasks: newTasks,
            showNewTask: false,
            showNewTaskSuccess: true
        });
    }

    handleAlertNewTaskClosed = () => {
        this.setState({showNewTaskSuccess: false});
    }

    render() {
        return (
            <React.Fragment>
                <NavigationBar/>
                <button type="button" onClick={this.handleOnClick.bind(this)}>Toggle</button>
                <NewTask show={this.state.showNewTask} handleShowChanged={this.handleOnClick.bind(this)}
                         handleNewTask={this.handleNewTaskSubmitted.bind(this)}/>
                <AlertNewTaskSuccess show={this.state.showNewTaskSuccess}
                                     handler={this.handleAlertNewTaskClosed.bind(this)}/>
                <CardColumns className="dashboard">
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
                </CardColumns>
            </React.Fragment>
        )
    }
}

export default Index