import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Box, Typography, TextField, Button, CircularProgress, Link } from '@mui/material';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSignUpLoading, setIsSignUpLoading] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setEmailError('');

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://51.21.197.93:8080/api/auth/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                setError(errorText || 'Login failed. Please check your credentials.');
                setIsLoading(false);
                return;
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            localStorage.setItem('justSignedUp', 'true'); // Set flag for snackbar

            // Simulate 2-second delay before navigating
            setTimeout(() => {
                setIsLoading(false);
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred during login. Please try again.');
            setIsLoading(false);
        }
    };

    const handleSignUpNavigation = () => {
        setIsSignUpLoading(true);
        setTimeout(() => {
            setIsSignUpLoading(false);
            navigate('/signup');
        }, 2000);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
            <Box sx={{ background: 'rgba(255, 255, 255, 0.9)', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '450px', textAlign: 'center' }}>
                <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
                    Login
                </Typography>
                {error && (
                    <Box sx={{ color: '#dc3545', backgroundColor: '#f8d7da', padding: '0.75rem', borderRadius: '12px', mb: 2 }}>
                        {error}
                    </Box>
                )}
                {emailError && (
                    <Box sx={{ color: '#dc3545', backgroundColor: '#f8d7da', padding: '0.75rem', borderRadius: '12px', mb: 2 }}>
                        {emailError}
                    </Box>
                )}
                <form onSubmit={handleLogin}>
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Box sx={{ mb: 3, position: 'relative' }}>
                        <TextField
                            label="Password"
                            type={passwordVisible ? 'text' : 'password'}
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            fullWidth
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                            }}
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            aria-label="Toggle password visibility"
                        >
                            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                        </Box>
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        fullWidth
                        sx={{ padding: '0.75rem', borderRadius: '12px', mb: 2 }}
                    >
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                    </Button>
                </form>
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="body2">
                        Don't have an account?{' '}
                    </Typography>
                    <Link
                        component="button"
                        onClick={handleSignUpNavigation}
                        sx={{ color: '#1976d2', textDecoration: 'none', cursor: 'pointer', ml: 1 }}
                    >
                        Sign Up
                    </Link>
                    {isSignUpLoading && <CircularProgress size={16} sx={{ ml: 1 }} />}
                </Box>
            </Box>
        </Box>
    );
};

export default Login;