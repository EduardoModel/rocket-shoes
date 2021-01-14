import React from 'react';
import { Router } from 'react-router-dom';
// Responsable to make the store available globally to the application
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import './config/ReactotronConfig';

import GlobalStyle from './styles/global';
import Header from './components/Header';
import Routes from './routes';

// Responsable to change the behaiviour of the navigation inside the router
import history from './services/history';
import store from './store';
/*
  The BrouserRouter was initialized here, because the header needs to access
  the navigation as well, to be able to change between the pages
*/
function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <GlobalStyle />
        <Header />
        <Routes />
        <ToastContainer autoClose={3000} />
      </Router>
    </Provider>
  );
}

export default App;
