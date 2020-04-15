import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// COMPONENTS
import App from './App';

// FONTS
import Lato from './fonts/Lato-Regular.ttf';

// MATERIAL UI - CORE
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const lato = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  src: `
    local('Lato'),
    local('Lato-Regular'),
    url(${Lato}) format('ttf')
  `,
};

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Lato, Arial',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [lato],
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
