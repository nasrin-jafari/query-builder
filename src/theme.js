import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'dark', // Enable dark mode
    primary: {
      main: '#ff9800', // Orange color for primary buttons and elements
    },
    background: {
      default: '#121212',
      paper: '#424242',
    },
  },
  typography: {
    fontSize: 14,
  },
});

export default theme;
