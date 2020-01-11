import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

const Title = (props) => {
    return (
        <Jumbotron>
            <h1>{props.title}</h1>
        </Jumbotron>
    )    
}

export default Title;