import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleAdminLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            const response = await fetch('/api/auth/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                setError(errorText || 'Login failed. Please check your credentials.');
                return;
            }

            const data = await response.json();
            if (data.role !== 'ADMIN') {
                setError('Access denied. Admins only.');
                return;
            }

            localStorage.setItem('token', data.token); // Store JWT token
            localStorage.setItem('role', data.role);
            navigate('/admindb'); // Redirect to admin dashboard on success
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred during login. Please try again.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f8f9fa', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#333' }}>Admin Login</h2>
                {error && (
                    <div style={{ color: '#dc3545', backgroundColor: '#f8d7da', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        {error}
                    </div>
                )}
                <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '1rem', outline: 'none' }} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '1rem', outline: 'none' }} />
                    <button type="submit" style={{ padding: '0.75rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer', transition: 'background-color 0.3s ease' }} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
