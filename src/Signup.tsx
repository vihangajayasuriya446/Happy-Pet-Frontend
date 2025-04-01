import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Box, Typography, TextField, Button, CircularProgress, Link } from '@mui/material';

const Signup: React.FC = () => {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [errors, setErrors] = useState({ general: '', email: '' });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isSignupLoading, setIsSignupLoading] = useState(false);
    const [isAdminSignupLoading, setIsAdminSignupLoading] = useState(false);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Reset form data on component mount
        setFormData({ firstName: '', lastName: '', email: '', password: '' });
        setErrors({ general: '', email: '' });
    }, []);

    const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({ general: '', email: '' });
        setIsSignupLoading(true);

        // Validate email
        if (!validateEmail(formData.email)) {
            setErrors((prev) => ({ ...prev, email: 'Please enter a valid email address.' }));
            setIsSignupLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, role: 'user' }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrors((prev) => ({ ...prev, general: errorData.message || 'Signup failed. Please try again.' }));
                setIsSignupLoading(false);
                return;
            }

            const data = await response.json();
            localStorage.setItem('token', data.token); // Save token
            localStorage.setItem('role', data.role); // Save role
            localStorage.setItem('justSignedUp', 'true'); // Set flag to show snackbar on homepage

            // Simulate 2-second delay before navigating to homepage
            setTimeout(() => {
                setIsSignupLoading(false);
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Error during signup:', error);
            setErrors((prev) => ({ ...prev, general: 'An error occurred during signup. Please try again.' }));
            setIsSignupLoading(false);
        }
    };

    const handleAdminSignupNavigation = () => {
        setIsAdminSignupLoading(true);
        setTimeout(() => {
            navigate('/adminsignup');
        }, 2000);
    };

    const handleLoginNavigation = () => {
        setIsLoginLoading(true);
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
            <Box sx={{ background: 'rgba(255, 255, 255, 0.9)', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '450px', textAlign: 'center' }}>
                <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
                    Sign Up
                </Typography>
                {errors.general && (
                    <Box sx={{ color: '#dc3545', backgroundColor: '#f8d7da', padding: '0.75rem', borderRadius: '12px', mb: 2 }}>
                        {errors.general}
                    </Box>
                )}
                {errors.email && (
                    <Box sx={{ color: '#dc3545', backgroundColor: '#f8d7da', padding: '0.75rem', borderRadius: '12px', mb: 2 }}>
                        {errors.email}
                    </Box>
                )}
                <form onSubmit={handleSignup}>
                    <TextField
                        label="First Name"
                        name="firstName"
                        variant="outlined"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        variant="outlined"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        variant="outlined"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Box sx={{ mb: 3, position: 'relative' }}>
                        <TextField
                            label="Password"
                            name="password"
                            type={passwordVisible ? 'text' : 'password'}
                            variant="outlined"
                            value={formData.password}
                            onChange={handleChange}
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
                        disabled={isSignupLoading}
                        fullWidth
                        sx={{ padding: '0.75rem', borderRadius: '12px', mb: 2 }}
                    >
                        {isSignupLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
                    </Button>
                    <Button
                        type="button"
                        variant="outlined"
                        disabled={isAdminSignupLoading}
                        fullWidth
                        sx={{ padding: '0.75rem', borderRadius: '12px', mb: 2 }}
                        onClick={handleAdminSignupNavigation}
                    >
                        {isAdminSignupLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up as Admin'}
                    </Button>
                </form>
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="body2">
                        Already signed up?{' '}
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

export default Signup;