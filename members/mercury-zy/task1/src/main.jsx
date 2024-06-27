import React from 'react';
import { createRoot } from 'react-dom/client'; 
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container); // 创建 root 实例
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);