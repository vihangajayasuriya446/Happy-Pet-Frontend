import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  padding: 20px;
  
`;

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  width: 100%;
  max-width: 450px;
  text-align: center;
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Input = styled(TextField)`
  width: 100%;
  margin-bottom: 1.25rem;

  & .MuiOutlinedInput-root {
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.8);
  }

  & .Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
  }
`;

const StyledButton = styled(Button)<{ isLoading?: boolean }>`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 12px;
  background-color: ${({ isLoading }) => (isLoading ? '#6c757d' : '#007bff')};
  color: white;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 123, 255, 0.2);

  &:hover:not(:disabled) {
    background-color: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 123, 255, 0.3);
    color: white;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const AdminButton = styled(Button)<{ isLoading?: boolean }>`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 12px;
  background-color: ${({ isLoading }) => (isLoading ? '#6c757d' : '#28a745')};
  color: white;
  transition: all 0.3s ease;
  margin-top: 1rem;
  box-shadow: 0 4px 6px rgba(40, 167, 69, 0.2);

  &:hover:not(:disabled) {
    background-color: #218838;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(40, 167, 69, 0.3);
    color: white;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [errors, setErrors] = useState({ general: '', email: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false); // For signup button loading
  const [isLoginLinkLoading, setIsLoginLinkLoading] = useState(false); // For login link loading
  const [isAdminLoading, setIsAdminLoading] = useState(false); // For admin button loading
  const [isSuccess, setIsSuccess] = useState(false); // For successful signup loading
  const navigate = useNavigate();

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

    if (!validateEmail(formData.email)) {
      setErrors((prev) => ({ ...prev, email: 'Please enter a valid email address.' }));
      setIsSignupLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role: 'user' }), // Default role is 'user'
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors((prev) => ({ ...prev, general: errorData.message || 'Signup failed. Please try again.' }));
        return;
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('justSignedUp', 'true');

      setIsSuccess(true); // Show loading spinner for successful signup
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay
      navigate('/'); // Navigate to homepage
    } catch (error) {
      console.error('Error during signup:', error);
      setErrors((prev) => ({ ...prev, general: 'An error occurred during signup. Please try again.' }));
    } finally {
      setIsSignupLoading(false);
      setIsSuccess(false); // Reset success state
    }
  };

  const handleNavigateToLogin = async () => {
    setIsLoginLinkLoading(true); // Show loading spinner for login link
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay
    navigate('/login');
  };

  const handleNavigateToAdminSignup = async () => {
    setIsAdminLoading(true); // Show loading spinner for admin button
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay
    navigate('/AdminSignup'); // Navigate to the admin signup page
  };

  return (
    <Container>
      <FormContainer>
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
        {isSuccess ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <CircularProgress size={60} color="primary" /> {/* Loading spinner */}
          </Box>
        ) : (
          <form onSubmit={handleSignup}>
            <Box sx={{ mb: 2 }}>
              <Input
                label="First Name"
                name="firstName"
                variant="outlined"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Input
                label="Last Name"
                name="lastName"
                variant="outlined"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Input
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Box>
            <Box sx={{ mb: 3, position: 'relative' }}>
              <Input
                label="Password"
                name="password"
                type={passwordVisible ? 'text' : 'password'}
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                required
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
            <Box sx={{ mb: 2 }}>
              <StyledButton type="submit" disabled={isSignupLoading || isLoginLinkLoading || isAdminLoading}>
                {isSignupLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
              </StyledButton>
            </Box>
            <Box sx={{ mb: 2 }}>
              <AdminButton
                onClick={handleNavigateToAdminSignup}
                disabled={isSignupLoading || isLoginLinkLoading || isAdminLoading}
                isLoading={isAdminLoading}
              >
                {isAdminLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up as Admin'}
              </AdminButton>
            </Box>
          </form>
        )}
        {!isSuccess && (
          <Typography variant="body2" sx={{ mt: 2, color: '#666' }}>
            Already have an account?{' '}
            <span
              style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline', fontWeight: 500 }}
              onClick={handleNavigateToLogin}
            >
              {isLoginLinkLoading ? <ClipLoader size={15} color="#007bff" /> : 'Login'}
            </span>
          </Typography>
        )}
      </FormContainer>
    </Container>
  );
};

export default Signup;