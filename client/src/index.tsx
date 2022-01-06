import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import AuthContextProvider from './context/auth/auth.context';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <AuthContextProvider>
            <Router>
                <App />
            </Router>
        </AuthContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

