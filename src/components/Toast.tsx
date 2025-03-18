import React, { useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

interface ToastProps {
    open: boolean;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    onClose: () => void;
    autoHideDuration?: number;
}

const Toast: React.FC<ToastProps> = ({
                                         open,
                                         message,
                                         type = 'info',
                                         onClose,
                                         autoHideDuration = 5000
                                     }) => {
    // Auto-hide toast after specified duration
    useEffect(() => {
        if (open && autoHideDuration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, autoHideDuration);

            return () => clearTimeout(timer);
        }
    }, [open, autoHideDuration, onClose]);

    // Get the appropriate icon based on toast type
    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircleOutlineIcon />;
            case 'error':
                return <ErrorOutlineIcon />;
            case 'warning':
                return <WarningAmberOutlinedIcon />;
            case 'info':
            default:
                return <InfoOutlinedIcon />;
        }
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert
                onClose={onClose}
                severity={type}
                icon={getIcon()}
                sx={{
                    width: '100%',
                    borderRadius: '12px',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Toast;
