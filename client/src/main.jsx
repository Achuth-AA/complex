import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import axios from 'axios';

// Set up default axios configuration
// axios.defaults.baseURL = 'http://localhost:5000';

axios.defaults.baseURL = 'https://supreme-invention-pq6rv5v67j92wv7-5000.app.github.dev/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);