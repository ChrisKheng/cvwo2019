import React from 'react';
import {Route} from "react-router-dom";
import Homepage from "./homepage/Homepage";
import About from "./about/About";

/**
 * Encapsulates all the possible routes in the product website (used by React-Router).
 */
const Routes = () => {
    return (
        <div>
            <Route exact path = "/" render = {() => <Homepage/>}/>
            <Route path = "/about" render = {() => <About/>}/>
        </div>
    )
};

export default Routes;