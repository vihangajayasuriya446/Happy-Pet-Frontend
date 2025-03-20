import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    typography: {
        fontFamily: '"Nunito Sans", sans-serif',
        h1: { fontWeight: 800 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 700 },
        h4: { fontWeight: 600 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
        button: {
            fontWeight: 600,
            textTransform: 'none',
        },
    },
    palette: {
        primary: {
            main: '#003366',
            contrastText: '#ffffff',
        },
        background: {
            default: '#003366',
            paper: '#ffffff',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    margin: 0,
                    padding: 0,
                    boxSizing: 'border-box',
                    backgroundColor: '#003366',
                },
                '*': {
                    boxSizing: 'border-box',
                    margin: 0,
                    padding: 0,
                },
                'a': {
                    textDecoration: 'none',
                    color: 'inherit',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    padding: '0.75rem 1.5rem',
                },
            },
        },
    },
});

export default theme;
