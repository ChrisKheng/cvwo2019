import React from 'react';
import {Route} from 'react-router-dom';
import Tasks from "./task/Tasks";

/**
 * Encapsulates the possible routes in the application page (for React-Router's use).
 */
const Routes = () => {
    return (
        <Route path="/app" render={() => <Tasks/>}/>
    )
};

export default Routes;