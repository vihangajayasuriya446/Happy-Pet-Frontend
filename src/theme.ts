import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    typography: {
        fontFamily: '"Nunito Sans", sans-serif',
        // Apply Nunito Sans to all typography variants
        allVariants: {
            fontFamily: '"Nunito Sans", sans-serif',
        },
        h1: {
            fontFamily: '"Nunito Sans", sans-serif',
            fontWeight: 800,
        },
        h2: {
            fontFamily: '"Nunito Sans", sans-serif',
            fontWeight: 700,
        },
        h3: {
            fontFamily: '"Nunito Sans", sans-serif',
            fontWeight: 700,
        },
        h4: {
            fontFamily: '"Nunito Sans", sans-serif',
            fontWeight: 600,
        },
        h5: {
            fontFamily: '"Nunito Sans", sans-serif',
            fontWeight: 600,
        },
        h6: {
            fontFamily: '"Nunito Sans", sans-serif',
            fontWeight: 600,
        },
        body1: {
            fontFamily: '"Nunito Sans", sans-serif',
            fontWeight: 400,
        },
        body2: {
            fontFamily: '"Nunito Sans", sans-serif',
            fontWeight: 400,
        },
        button: {
            fontFamily: '"Nunito Sans", sans-serif',
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
                    fontFamily: '"Nunito Sans", sans-serif',
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
        MuiContainer: {
            styleOverrides: {
                root: {
                    '@media (max-width: 768px)': {
                        padding: '0 1rem',
                    },
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
        MuiInputBase: {
            styleOverrides: {
                root: {
                    fontFamily: '"Nunito Sans", sans-serif',
                },
            },
        },
    },
});

export default theme;
