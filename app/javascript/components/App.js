import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from "./app/task/NavigationBar";
import {BrowserRouter as Router} from "react-router-dom";
import Routes from "./app/Routes";

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