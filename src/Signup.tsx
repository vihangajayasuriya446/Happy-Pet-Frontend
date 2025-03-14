import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  padding: 20px;
`;

const FormContainer = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button<{ isLoading?: boolean }>`
  padding: 0.75rem;
  background-color: ${({ isLoading }) => (isLoading ? '#6c757d' : '#007bff')};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const Signup: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isSignupLoading, setIsSignupLoading] = useState(false);
    const [isAdminSignupLoading, setIsAdminSignupLoading] = useState(false);
    const [isLoginNavigating, setIsLoginNavigating] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setEmailError('');
        setIsSignupLoading(true);

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            setIsSignupLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Signup failed. Please try again.');
                return;
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);

            // Add 2-second delay before navigation
            await new Promise(resolve => setTimeout(resolve, 2000));
            navigate('/');
        } catch (error) {
            console.error('Error during signup:', error);
            setError('An error occurred during signup. Please try again.');
        } finally {
            setIsSignupLoading(false);
        }
    };

    const handleAdminSignup = async () => {
        setIsAdminSignupLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        navigate('/adminsignup');
        setIsAdminSignupLoading(false);
    };

    const handleLoginNavigation = async () => {
        setIsLoginNavigating(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        navigate('/login');
        setIsLoginNavigating(false);
    };

    return (
        <Container>
            <FormContainer>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#333', fontWeight: '600' }}>
                    Sign Up
                </h2>
                {error && (
                    <div style={{ color: '#dc3545', backgroundColor: '#f8d7da', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                        {error}
                    </div>
                )}
                {emailError && (
                    <div style={{ color: '#dc3545', backgroundColor: '#f8d7da', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                        {emailError}
                    </div>
                )}
                <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <Input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <Input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div style={{ position: 'relative' }}>
                        <Input
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
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
                    <Button type="submit" disabled={isSignupLoading || isLoginNavigating}>
                        {isSignupLoading ? <ClipLoader size={20} color="#ffffff" /> : 'Sign Up'}
                    </Button>
                    <Button
                        type="button"
                        onClick={handleAdminSignup}
                        disabled={isAdminSignupLoading || isLoginNavigating}
                        style={{ backgroundColor: '#6c757d' }}
                    >
                        {isAdminSignupLoading ? <ClipLoader size={20} color="#ffffff" /> : 'Signup as Admin'}
                    </Button>
                </form>
                <div style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#666' }}>
                    <p>
                        Already have an account?{' '}
                        <span
                            style={{
                                color: '#007bff',
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                fontWeight: '500',
                            }}
                            onClick={handleLoginNavigation}
                        >
                            {isLoginNavigating ? <ClipLoader size={15} color="#007bff" /> : 'Login'}
                        </span>
                    </p>
                </div>
            </FormContainer>
        </Container>
    );
};

export default Signup;