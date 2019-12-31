import React from 'react';
import Container from "react-bootstrap/Container";

const Footer = () => {
    return (
        <Container>
            <footer className="footer">
                <small>
                    Created by <a href="https://github.com/chrisKheng/">Yau Dong</a>
                </small>
                <br/>
                <small>
                    <a href="https://github.com/chrisKheng/cvwo2020">View on GitHub</a>
                </small>
            </footer>
        </Container>
    )
}

export default Footer