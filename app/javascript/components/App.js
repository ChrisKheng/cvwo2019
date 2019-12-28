import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router} from "react-router-dom";
import Routes from "./Routes";
import NavigationBar from "./global/NavigationBar";
import Footer from "./global/Footer";

class App extends React.Component {
    render() {
        return (
            <Router>
                <NavigationBar/>
                <Routes/>
            </Router>
        )
    }
}

export default App