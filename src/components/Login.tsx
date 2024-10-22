import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      access_token
    }
  }
`;

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login] = useMutation(LOGIN_MUTATION);
    const history = useHistory();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await login({
                variables: { email, password },
            });
            localStorage.setItem('token', data.login.access_token);
            history.push('/dashboard');
        } catch (err) {
            console.error('Login failed', err);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
