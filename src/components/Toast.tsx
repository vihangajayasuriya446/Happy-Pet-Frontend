import React, { useEffect } from 'react';
import { Box, Typography, IconButton, Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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

    if (!open) return null;

    // Get the appropriate icon and color based on toast type
    const getIconAndColor = () => {
        switch (type) {
            case 'success':
                return {
                    icon: <CheckCircleOutlineIcon sx={{ mr: 1.5 }} />,
                    color: '#4caf50',
                    bgColor: 'rgba(76, 175, 80, 0.08)'
                };
            case 'error':
                return {
                    icon: <ErrorOutlineIcon sx={{ mr: 1.5 }} />,
                    color: '#f44336',
                    bgColor: 'rgba(244, 67, 54, 0.08)'
                };
            case 'warning':
                return {
                    icon: <WarningAmberOutlinedIcon sx={{ mr: 1.5 }} />,
                    color: '#ff9800',
                    bgColor: 'rgba(255, 152, 0, 0.08)'
                };
            case 'info':
            default:
                return {
                    icon: <InfoOutlinedIcon sx={{ mr: 1.5 }} />,
                    color: '#2196f3',
                    bgColor: 'rgba(33, 150, 243, 0.08)'
                };
        }
    };

    const { icon, color, bgColor } = getIconAndColor();

    return (
        <Fade in={open}>
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 20,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 2000,
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: bgColor,
                    borderRadius: 2,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    py: 1.5,
                    px: 2,
                    minWidth: 250,
                    maxWidth: '90%',
                    borderLeft: `4px solid ${color}`
                }}
                role="alert"
                aria-live="assertive"
            >
                <Box sx={{ color }}>{icon}</Box>
                <Typography variant="body1" sx={{ flexGrow: 1, color: 'text.primary' }}>
                    {message}
                </Typography>
                <IconButton
                    size="small"
                    onClick={onClose}
                    sx={{ ml: 1, color: 'text.secondary' }}
                    aria-label="Close notification"
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Box>
        </Fade>
    );
};

export default Toast;
