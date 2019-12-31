import React from 'react';
import {Route} from 'react-router-dom'
import Tasks from "./task/Tasks";

const Routes = () => {
    return (
        <Route path="/app" render={() => <Tasks/>}/>
    )
}

export default Routes;