import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Represents the about page of the product website.
 */
class About extends React.Component {
    render() {
        return (
            <div className="about">
                <header>
                    <h1>About</h1>
                </header>

                <article>
                    <p>
                        DoIT is a todo manager which aims to help the users to keep track of their to-dos
                        easily.
                    </p>

                    <p>
                        The application is created and designed
                        by <a href="https://github.com/chrisKheng">Chris Kheng</a>.<br/>

                        View it on <a href="https://github.com/ChrisKheng/cvwo2020">GitHub</a>
                    </p>
                </article>
            </div>
        )
    }
}

export default About;