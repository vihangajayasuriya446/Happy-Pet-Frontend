import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCircleNotch } from '@fortawesome/free-solid-svg-icons';

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
            const response = await fetch('http://localhost:8080/api/auth/authenticate', {
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

            // Simulate a 2-second delay before navigating
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

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                fontFamily: 'Arial, sans-serif',
                padding: '20px',
                marginTop: '-70px',
            }}
        >
            <div
                style={{
                    background: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white
                    padding: '2.5rem',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    maxWidth: '400px',
                    textAlign: 'center',
                    marginTop: 0,
                    backdropFilter: 'blur(10px)', // Adjust the blur radius as needed
                    WebkitBackdropFilter: 'blur(10px)', // For Safari support
                }}
            >
                <h2
                    style={{
                        fontSize: '2rem',
                        marginBottom: '1.5rem',
                        color: '#333',
                        fontWeight: '600',
                        marginTop: 0,
                    }}
                >
                    Login
                </h2>
                {error && (
                    <div
                        style={{
                            color: '#dc3545',
                            backgroundColor: '#f8d7da',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            marginBottom: '1.5rem',
                            fontSize: '0.9rem',
                        }}
                    >
                        {error}
                    </div>
                )}
                {emailError && (
                    <div
                        style={{
                            color: '#dc3545',
                            backgroundColor: '#f8d7da',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            marginBottom: '1.5rem',
                            fontSize: '0.9rem',
                        }}
                    >
                        {emailError}
                    </div>
                )}
                <form
                    onSubmit={handleLogin}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.25rem',
                        marginTop: 0,
                    }}
                >
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            padding: '0.75rem',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            outline: 'none',
                            transition: 'border-color 0.3s ease',
                            width: '100%',
                            boxSizing: 'border-box',
                        }}
                    />
                    <div style={{ position: 'relative', width: '100%', boxSizing: 'border-box' }}>
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                padding: '0.75rem',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.3s ease',
                                width: '100%',
                                boxSizing: 'border-box',
                            }}
                        />
                        <span
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                            }}
                            onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                        </span>
                    </div>
                    <button
                        type="submit"
                        style={{
                            padding: '0.75rem',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '0.5rem',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <FontAwesomeIcon icon={faCircleNotch} spin /> {/* Use faCircleNotch */}
                                Loading...
                            </>
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>
                <div
                    style={{
                        marginTop: '1.5rem',
                        fontSize: '0.9rem',
                        color: '#666',
                    }}
                >
                    <p>
                        Don't have an account?{' '}
                        <span
                            style={{
                                color: '#007bff',
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                fontWeight: '500',
                            }}
                            onClick={() => {
                                setIsSignUpLoading(true);
                                setTimeout(() => {
                                    setIsSignUpLoading(false);
                                    navigate('/signup');
                                }, 2000);
                            }}
                        >
                            {isSignUpLoading ? (
                                <>
                                    <FontAwesomeIcon icon={faCircleNotch} spin /> {/* Use faCircleNotch */}
                                </>
                            ) : (
                                'Sign Up'
                            )}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;