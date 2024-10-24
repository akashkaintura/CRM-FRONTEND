import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { Container, TextField, Button, Typography, Box, Link, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const SIGNUP_MUTATION = gql`
 mutation Register($registerDto: RegisterDto!) {
    register(registerDto: $registerDto) {
      access_token
    }
  }
`;

const Signup: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('EMPLOYEE');
    const [register, { loading, error }] = useMutation(SIGNUP_MUTATION);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await register({
                variables: {
                    registerDto: {
                        name,
                        email,
                        password,
                        role,
                    },
                },
            });
            if (data) {
                localStorage.setItem('token', data.register.access_token);
                localStorage.setItem('employeeId', data.register.employeeId);
                console.log('Signed up successfully:', data);
                navigate('/dashboard');
            } else {
                console.error('Employee ID is missing from signup response');
            }
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
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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

                    {/* Role Dropdown */}
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="role-select-label">Role</InputLabel>
                        <Select
                            labelId="role-select-label"
                            id="role-select"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            label="Role"
                        >
                            <MenuItem value="EMPLOYEE">Employee</MenuItem>
                            <MenuItem value="ADMIN">Admin</MenuItem>
                            <MenuItem value="MANAGER">Manager</MenuItem>
                        </Select>
                    </FormControl>

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

export default Signup;