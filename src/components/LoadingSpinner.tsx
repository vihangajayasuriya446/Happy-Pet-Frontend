// components/LoadingSpinner.tsx
import React, { useState, useEffect } from "react";
import {
    Box,
    CircularProgress,
    Typography,
    Fade,
    Paper,
    LinearProgress,
    useTheme
} from "@mui/material";
import PetsIcon from '@mui/icons-material/Pets';

interface LoadingSpinnerProps {
    message?: string;
    variant?: 'circular' | 'linear' | 'pet';
    showBackground?: boolean;
    size?: number | string;
    color?: string;
    timeout?: number;
    fullScreen?: boolean;
    loadingTips?: string[];
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
                                                           message = "Loading...",
                                                           variant = "circular",
                                                           showBackground = true,
                                                           size = 60,
                                                           color,
                                                           timeout,
                                                           fullScreen = false,
                                                           loadingTips = [
                                                               "Finding the perfect pets for you...",
                                                               "Fetching adorable companions...",
                                                               "Preparing tails to wag...",
                                                               "Gathering furry friends...",
                                                               "Loading pet paradise..."
                                                           ]
                                                       }) => {
    const theme = useTheme();
    const spinnerColor = color || theme.palette.primary.main;
    const [currentTip, setCurrentTip] = useState(0);
    const [visible, setVisible] = useState(true);
    const [progress, setProgress] = useState(0);

    // Rotate through loading tips
    useEffect(() => {
        if (loadingTips.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentTip(prev => (prev + 1) % loadingTips.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [loadingTips.length]);

    // Optional timeout to hide spinner after certain duration
    useEffect(() => {
        if (!timeout) return;

        const timer = setTimeout(() => {
            setVisible(false);
        }, timeout);

        return () => clearTimeout(timer);
    }, [timeout]);

    // Progress bar animation
    useEffect(() => {
        if (variant !== 'linear') return;

        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);

        return () => clearInterval(timer);
    }, [variant]);

    // Pet animation for the pet variant
    const [rotation, setRotation] = useState(0);
    useEffect(() => {
        if (variant !== 'pet') return;

        const animationFrame = requestAnimationFrame(() => {
            setRotation(prev => (prev + 1) % 360);
        });

        return () => cancelAnimationFrame(animationFrame);
    }, [rotation, variant]);

    if (!visible) return null;

    const content = (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 4,
                height: fullScreen ? '100vh' : 'auto',
                width: fullScreen ? '100vw' : 'auto',
                position: fullScreen ? 'fixed' : 'relative',
                top: fullScreen ? 0 : 'auto',
                left: fullScreen ? 0 : 'auto',
                zIndex: fullScreen ? 9999 : 1,
                backgroundColor: fullScreen ? 'rgba(0, 0, 0, 0.7)' : 'transparent'
            }}
        >
            <Fade in={true} timeout={1000}>
                <Paper
                    elevation={showBackground ? 4 : 0}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: showBackground ? 4 : 0,
                        borderRadius: 2,
                        backgroundColor: showBackground ? 'background.paper' : 'transparent',
                        minWidth: showBackground ? 200 : 'auto',
                        minHeight: showBackground ? 150 : 'auto',
                        maxWidth: 400
                    }}
                >
                    {variant === 'circular' && (
                        <CircularProgress
                            size={typeof size === 'number' ? size : parseInt(size as string, 10)}
                            thickness={4}
                            sx={{ color: spinnerColor, mb: 2 }}
                        />
                    )}

                    {variant === 'linear' && (
                        <Box sx={{ width: '100%', mb: 2 }}>
                            <LinearProgress
                                variant="determinate"
                                value={progress}
                                sx={{
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: theme.palette.grey[200],
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: spinnerColor
                                    }
                                }}
                            />
                        </Box>
                    )}

                    {variant === 'pet' && (
                        <Box
                            sx={{
                                animation: 'bounce 1s infinite alternate',
                                '@keyframes bounce': {
                                    '0%': { transform: 'translateY(0)' },
                                    '100%': { transform: 'translateY(-10px)' }
                                },
                                mb: 2
                            }}
                        >
                            <PetsIcon
                                sx={{
                                    fontSize: typeof size === 'number' ? size : parseInt(size as string, 10),
                                    color: spinnerColor,
                                    transform: `rotate(${rotation}deg)`,
                                    transition: 'transform 0.5s ease-in-out'
                                }}
                            />
                        </Box>
                    )}

                    <Typography
                        variant="h6"
                        color={showBackground ? "text.primary" : "white"}
                        sx={{
                            textAlign: 'center',
                            fontWeight: 500
                        }}
                    >
                        {message}
                    </Typography>

                    {loadingTips.length > 0 && (
                        <Fade key={currentTip} in={true} timeout={500}>
                            <Typography
                                variant="body2"
                                color={showBackground ? "text.secondary" : "rgba(255,255,255,0.7)"}
                                sx={{
                                    mt: 1,
                                    textAlign: 'center',
                                    fontStyle: 'italic',
                                    minHeight: 40
                                }}
                            >
                                {loadingTips[currentTip]}
                            </Typography>
                        </Fade>
                    )}
                </Paper>
            </Fade>
        </Box>
    );

    return content;
};

export default LoadingSpinner;
