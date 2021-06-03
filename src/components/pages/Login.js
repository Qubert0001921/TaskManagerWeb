import React from 'react';
import AuthClient from '../../client/auth';

class Login extends React.Component {
    state = {
        name: "",
        password: ""
    }

    render() {
        async function login(name, password) {
            const user = await AuthClient.login({ name: name, password: password });
            localStorage.setItem("AccessToken", user.data.accessToken);
        }

        return (
            <div>
                <input name="name" type="text" onChange={(e) => { this.setState({ name: e.target.value}) }} /><br />
                <input name="password" type="text" onChange={(e) => { this.setState({ password: e.target.value}) }} /><br />
                <button onClick={() => { login(this.state.name, this.state.password) }}>Zaloguj</button>
            </div>
        );
    }
}

export default Login;