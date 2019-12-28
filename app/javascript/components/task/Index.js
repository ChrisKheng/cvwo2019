import React from 'react'
import axios from 'axios'

class Index extends React.Component {
    state = {
        tasks: []
    }

    componentDidMount() {
        axios.get("http://localhost:3000/tasks")
            .then(result => {
                console.log(result.data);
            })
    }

    render() {
        return (
            <React.Fragment>
                <ul>
                </ul>
            </React.Fragment>
        )
    }
}

export default React