import React from 'react';
import { Box, Typography, IconButton, Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface ToastProps {
    open: boolean;
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ open, message, type, onClose }) => {
    if (!open) return null;

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
                    bgcolor: 'white',
                    borderRadius: 2,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    py: 1.5,
                    px: 2,
                    minWidth: 250,
                    maxWidth: '90%'
                }}
            >
                {type === 'success' ? (
                    <CheckCircleOutlineIcon color="success" sx={{ mr: 1.5 }} />
                ) : (
                    <ErrorOutlineIcon color="error" sx={{ mr: 1.5 }} />
                )}
                <Typography variant="body1" sx={{ flexGrow: 1 }}>
                    {message}
                </Typography>
                <IconButton size="small" onClick={onClose} sx={{ ml: 1 }}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Box>
        </Fade>
    );
};

export default Toast;
