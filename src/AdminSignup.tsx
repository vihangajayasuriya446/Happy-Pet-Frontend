import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminSignup: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState(''); // Added email error state
    const navigate = useNavigate();

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleAdminSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setEmailError(''); // Clear email error

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/auth/register-admin?secretKey=vihanga-2022', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                setError(errorText || 'Signup failed. Please try again.');
                return;
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            navigate('/admindb');
        } catch (error) {
            console.error('Error during signup:', error);
            setError('An error occurred during signup. Please try again.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f8f9fa', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#333' }}>Admin Sign Up</h2>
                {error && (
                    <div style={{ color: '#dc3545', backgroundColor: '#f8d7da', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        {error}
                    </div>
                )}
                {emailError && (
                    <div style={{ color: '#dc3545', backgroundColor: '#f8d7da', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        {emailError}
                    </div>
                )}
                <form onSubmit={handleAdminSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '1rem', outline: 'none' }} />
                    <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '1rem', outline: 'none' }} />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '1rem', outline: 'none' }} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '1rem', outline: 'none' }} />
                    <input type="text" placeholder="Secret Key" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} required style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '1rem', outline: 'none' }} />
                    <button type="submit" style={{ padding: '0.75rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer', transition: 'background-color 0.3s ease' }} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}>
                        Sign Up
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
                        Already have an account?{' '}
                        <span
                            style={{
                                color: '#007bff',
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                fontWeight: '500',
                            }}
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminSignup;