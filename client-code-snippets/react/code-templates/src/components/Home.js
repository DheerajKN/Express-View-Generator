import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactImage from '../assets/logo.png';
import '../style.css';

export default class App extends Component {

    state = { username: null };

    componentDidMount() {
        fetch(`${JSON.parse(process.env.ELECTRON_PROD) ? 'http://localhost:8080/api' : '/api'}/getUsername`)
            .then(res => res.json())
            .then(user => this.setState({ username: user.username }));
    }

    render() {
        const { username } = this.state;
        return (
            <div>
                <img src={ReactImage} alt="react" style={{ height: '250px' }} />
                {username ? <h1>{`Hello there, I'm ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
                <Link to="/users">See More users</Link>
            </div>
        )
    }
}