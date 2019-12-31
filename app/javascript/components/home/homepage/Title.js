import React from 'react';
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

const Title = () => {
    return (
        <Jumbotron className="home-title-jumbotron">
            <h1>Welcome!</h1>
            <Button href="/app">View Tasks</Button>
        </Jumbotron>
    )
}

export default Title