import React from 'react';
import ReactDOM from 'react-dom/client';

// router
import { BrowserRouter } from 'react-router-dom';

// mui
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './theme';

ReactDOM.createRoot(document.getElementById(`root`) as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
