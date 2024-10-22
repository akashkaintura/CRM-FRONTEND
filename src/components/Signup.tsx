import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';

const SIGNUP_MUTATION = gql`
  mutation Register($email: String!, $password: String!, $name: String!) {
    register(registerInput: { email: $email, password: $password, name: $name }) {
      access_token
    }
  }
`;

const SignUp: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [register, { loading, error }] = useMutation(SIGNUP_MUTATION);
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await register({
                variables: { email, password, name },
            });
            localStorage.setItem('token', data.register.access_token);
            navigate('/dashboard');
        } catch (err) {
            console.error('Signup failed', err);
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
                    Create an Account
                </Typography>
                <form onSubmit={handleSignup} style={{ width: '100%' }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Full Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
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
                    {error && <Typography color="error">Signup failed, please try again.</Typography>}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </Button>
                </form>
                <Link href="/login" variant="body2" sx={{ mt: 2 }}>
                    Already have an account? Sign in
                </Link>
            </Box>
        </Container>
    );
};

export default SignUp;
