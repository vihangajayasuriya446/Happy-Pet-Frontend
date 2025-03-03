import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboardNav: React.FC = () => {
    const navigate = useNavigate(); // React Router hook for navigation

    const styles: { [key: string]: React.CSSProperties } = {
        body: {
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f4f4f9',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            margin: 0,
            padding: 0,
        },
        dashboardContainer: {
            textAlign: 'center' as const,
            backgroundColor: '#ffffff',
            padding: '2rem',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            maxWidth: '400px',
            width: '100%',
        },
        heading: {
            fontSize: '24px',
            color: '#333',
            marginBottom: '1.5rem',
        },
        buttonContainer: {
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '1rem',
        },
        dashboardButton: {
            display: 'block',
            padding: '1rem',
            backgroundColor: '#007bff',
            color: '#ffffff',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
            fontSize: '16px',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
        },
        dashboardButtonHover: {
            backgroundColor: '#0056b3',
            transform: 'translateY(-2px)',
        },
    };

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <div style={styles.body}>
            <div style={styles.dashboardContainer}>
                <h1 style={styles.heading}>Admin Dashboard</h1>
                <div style={styles.buttonContainer}>
                    {[
                        { label: 'Pet Adopt Admin Dashboard', path: '/pet-adopt' },
                        { label: 'Pet Buy Admin Dashboard', path: '/pet-buy' },
                        { label: 'Matchmaking Admin Dashboard', path: '/matchmaking' }
                    ].map((item, index) => (
                        <button
                            key={index}
                            style={styles.dashboardButton}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = styles.dashboardButtonHover.backgroundColor ?? '#0056b3';
                                e.currentTarget.style.transform = styles.dashboardButtonHover.transform ?? 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = styles.dashboardButton.backgroundColor ?? '#007bff';
                                e.currentTarget.style.transform = 'translateY(0)';
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

