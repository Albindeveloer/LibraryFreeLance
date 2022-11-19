import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { AuthReducerProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthReducerProvider> 
      <App />
    </AuthReducerProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// BookUpdateContextProvider is used to reload the content when ny updte occur in book collection
