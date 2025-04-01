import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Box, Typography, TextField, Button, CircularProgress, Link } from '@mui/material';

const AdminSignup: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isSignupLoading, setIsSignupLoading] = useState(false);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleAdminSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setEmailError('');

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }

        setIsSignupLoading(true);

        try {
            const response = await fetch('/api/auth/register-admin?secretKey=vihanga-2022', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                setError(errorText || 'Signup failed. Please try again.');
                setIsSignupLoading(false);
                return;
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);

            // Simulate 2-second delay before navigating
            setTimeout(() => {
                setIsSignupLoading(false);
                navigate('/admindb');
            }, 2000);
        } catch (error) {
            console.error('Error during signup:', error);
            setError('An error occurred during signup. Please try again.');
            setIsSignupLoading(false);
        }
    };

    const handleLoginNavigation = () => {
        setIsLoginLoading(true);
        setTimeout(() => {
            setIsLoginLoading(false);
            navigate('/login');
        }, 2000);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
            <Box sx={{ background: 'rgba(255, 255, 255, 0.9)', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '450px', textAlign: 'center' }}>
                <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
                    Admin Sign Up
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
                <form onSubmit={handleAdminSignup}>
                    <TextField
                        label="First Name"
                        variant="outlined"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        fullWidth
                        sx={{ mb: 2 }}
                    />
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
                    <Box sx={{ mb: 2, position: 'relative' }}>
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
                    <TextField
                        label="Secret Key"
                        variant="outlined"
                        value={secretKey}
                        onChange={(e) => setSecretKey(e.target.value)}
                        required
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSignupLoading}
                        fullWidth
                        sx={{ padding: '0.75rem', borderRadius: '12px', mb: 2 }}
                    >
                        {isSignupLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
                    </Button>
                </form>
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="body2">
                        Already have an account?{' '}
                    </Typography>
                    <Link
                        component="button"
                        onClick={handleLoginNavigation}
                        sx={{ color: '#1976d2', textDecoration: 'none', cursor: 'pointer', ml: 1 }}
                    >
                        Login
                    </Link>
                    {isLoginLoading && <CircularProgress size={16} sx={{ ml: 1 }} />}
                </Box>
            </Box>
        </Box>
    );
};

export default AdminSignup;