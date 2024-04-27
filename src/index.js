import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import theme from './theme'; // Import the theme

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline /> {/* This is for baseline CSS and Dark Mode support */}
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
