import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboardNav: React.FC = () => {
    const navigate = useNavigate(); // React Router hook for navigation

    const styles: { [key: string]: React.CSSProperties } = {
        body: {
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f0f2f5', // Light gray background for the whole page
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            margin: 0,
            padding: '2rem',
            boxSizing: 'border-box',
        },
        dashboardContainer: {
            textAlign: 'center',
            backgroundColor: '#ffffff',
            padding: '2.5rem',
            borderRadius: '12px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            maxWidth: '450px',
            width: '100%',
        },
        heading: {
            fontSize: '28px',
            color: '#333',
            marginBottom: '2rem',
            fontWeight: '600',
        },
        buttonContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
        },
        dashboardButton: {
            display: 'block',
            padding: '1rem',
            backgroundColor: '#007bff',
            color: '#ffffff',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        dashboardButtonHover: {
            backgroundColor: '#0056b3',
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
        },
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        window.scrollTo(0, 0);
    };

    return (
        <div style={styles.body}>
            <div style={styles.dashboardContainer}>
                <h1 style={styles.heading}>Admin Dashboard</h1>
                <div style={styles.buttonContainer}>
                    {[
                        { label: 'Pet Adopt Admin Dashboard', path: '/pet-adopt' },
                        { label: 'Pet Buy Admin Dashboard', path: '/pet-buy' },
                        { label: 'Matchmaking Admin Dashboard', path: '/dashboard' }
                    ].map((item, index) => (
                        <button
                            key={index}
                            style={styles.dashboardButton}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = styles.dashboardButtonHover.backgroundColor ?? '#0056b3';
                                e.currentTarget.style.transform = styles.dashboardButtonHover.transform ?? 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = styles.dashboardButtonHover.boxShadow ?? '0 6px 12px rgba(0, 0, 0, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = styles.dashboardButton.backgroundColor ?? '#007bff';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                            }}
                            onClick={() => handleNavigation(item.path)}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardNav;