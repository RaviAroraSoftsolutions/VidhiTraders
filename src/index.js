import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { ConfirmProvider } from 'material-ui-confirm';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ToastContainer />
    <BrowserRouter>
    <ConfirmProvider>
    <Provider store={store}>
      <App />
    </Provider>
      
    </ConfirmProvider>
      
    </BrowserRouter>
    
  </>
);

reportWebVitals();
