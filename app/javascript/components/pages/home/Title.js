import React from 'react';
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const Title = () => {
    return (
        <Jumbotron className="home-title-jumbotron">
            <Container>
                <h1>Welcome!</h1>
                <Button href="">View Tasks</Button>
                <Button href="">Create Task</Button>
            </Container>
        </Jumbotron>
    )
}

export default Title