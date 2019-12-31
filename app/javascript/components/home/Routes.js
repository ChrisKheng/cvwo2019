import React from 'react';
import {Route} from "react-router-dom";
import Homepage from "./homepage/Homepage";
import About from "./about/About";

const Routes = () => {
    return (
        <div>
            <Route exact path = "/" render = {() => <Homepage/>}/>
            <Route path = "/about" render = {() => <About/>}/>
        </div>
    )
}

export default Routes;