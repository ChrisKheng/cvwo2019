import React from 'react';
import {Route} from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import TaskForm from "./task/TaskForm";

const Routes = () => {
    return (
        <div>
            <Route exact path = "/" render = {() => <Home/>}></Route>
            <Route path = "/about" render = {() => <About/>}></Route>
        </div>
    )
}

export default Routes