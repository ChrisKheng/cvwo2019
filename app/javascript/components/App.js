import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router} from "react-router-dom";
import Routes from "./app/Routes";

/**
 * Represents the landing page of the application.
 */
class App extends React.Component {
    render() {
        return (
            <Router>
                <Routes/>
            </Router>
        )
    }
}

export default App;