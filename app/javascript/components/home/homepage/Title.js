import React from 'react';
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

/**
 * Represents the title jumbotron in the home page.
 */
const Title = () => {
    return (
        <Jumbotron id="home-title-jumbotron">
            <h1>Welcome!</h1>

            <Button href="/app/tasks">View Tasks</Button>

            <footer className="home-footer">
                <p>Photo credit to <a href="https://jaymantri.com">Jay Mantri</a></p>
            </footer>
        </Jumbotron>
    )
};

export default Title;