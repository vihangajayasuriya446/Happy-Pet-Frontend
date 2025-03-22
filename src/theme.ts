import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#003366',
            light: '#e8eaf6',
            dark: '#345382',
        },
        secondary: {
            main: '#f8b400',
        },
        text: {
            primary: '#333333',
            secondary: '#666666',
        },
        background: {
            default: '#ffffff',
            paper: '#f9f9f9',
        },
    },
    typography: {
        fontFamily: '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
    },
});

export default theme;
