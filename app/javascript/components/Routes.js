import React from 'react';
import {Route} from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";

const Routes = () => {
    return (
        <div>
            <Route exact path = "/" render = {() => <Home/>}></Route>
            <Route exact path = "/about" render = {() => <About/>}></Route>
        </div>
    )
}

export default Routes