import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router} from "react-router-dom";
import NavigationBar from "./home/NavigationBar";
import Routes from "./home/Routes";

/**
 * Represents the product website of the application.
 * Product website is the page where the application is introduced.
 */
class Home extends React.Component {
    render() {
        return (
            <Router>
                <NavigationBar/>
                <Routes/>
            </Router>
        )
    }
}

export default Home;