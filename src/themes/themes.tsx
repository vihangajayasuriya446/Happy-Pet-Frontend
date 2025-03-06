import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: "#002855",
    },
    secondary: {
      main: "#F8F9FA",
    },
    background: {
      default: "#003366",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#ffffff",
    },
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
