// components/LoadingSpinner.tsx
import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingSpinnerProps {
    message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
                                                           message = "Loading..."
                                                       }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 4,
            }}
        >
            <CircularProgress
                size={60}
                thickness={4}
                sx={{ color: "#0099cc", mb: 2 }}
            />
            <Typography variant="h6" color="white">
                {message}
            </Typography>
        </Box>
    );
};

export default LoadingSpinner;
