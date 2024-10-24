import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';

const LOGIN_MUTATION = gql`
  mutation Login($loginDto: LoginDto!) {
    login(loginDto: $loginDto) {
      access_token
    }
  }
`;

const Login: React.FC<{ setIsAuthenticated: (value: boolean) => void }> = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { loading, error }] = useMutation(LOGIN_MUTATION);
    const navigate = useNavigate();

    // Handle the form submission
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await login({
                variables: {
                    loginDto: {
                        email,
                        password
                    }
                },
            });
            console.log('Login response:', data);

            // Save the token and navigate to the dashboard
            // localStorage.setItem('token', data.login.access_token);
            // localStorage.setItem('employeeId', data.login.employeeId);

            if (data?.user?.login?.employeeId) {
                localStorage.setItem('employeeId', data.login.user.employeeId);
                localStorage.setItem('token', data.login.access_token);
                navigate('/dashboard');
                console.log('employeeId', data.login.user.employeeId)
            } else {
                console.error('Employee ID is missing from the login response');
            }

            // setIsAuthenticated(true);
            // navigate('/dashboard');
        } catch (err) {
            console.error('Login failed', err);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '24px',
                    boxShadow: 3,
                    borderRadius: 2,
                }}
            >
                <Typography component="h1" variant="h4" sx={{ mb: 4 }}>
                    Sign In
                </Typography>
                <form onSubmit={handleLogin} style={{ width: '100%' }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <Typography color="error">Login failed, please try again.</Typography>}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Sign In'}
                    </Button>
                </form>
                <Link href="/signup" variant="body2" sx={{ mt: 2 }}>
                    Don't have an account? Sign up
                </Link>
            </Box>
        </Container>
    );
};

export default Login;
