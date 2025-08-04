import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/user.jsx';
import { AdminModeProvider } from './contexts/admin.jsx';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <AdminModeProvider>
          <App />
        </AdminModeProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
