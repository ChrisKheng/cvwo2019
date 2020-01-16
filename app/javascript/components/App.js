import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import Routes from "./app/Routes";

/**
 * The landing page of the application.
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