import React from 'react';
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

const Title = () => {
    return (
        <Jumbotron id="home-title-jumbotron">
            <h1>Welcome!</h1>
            <Button href="/app">View Tasks</Button>
            <footer className="home-footer">
                Photo credit to <a href="https://jaymantri.com">Jay Mantri</a>
            </footer>
        </Jumbotron>
    )
}

export default Title