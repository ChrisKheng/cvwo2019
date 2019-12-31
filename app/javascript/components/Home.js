import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router} from "react-router-dom";
import NavigationBar from "./home/global/NavigationBar";
import Routes from "./home/Routes";

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

export default Home