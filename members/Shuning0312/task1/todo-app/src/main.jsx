// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App'; // 确保路径和文件名正确
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
