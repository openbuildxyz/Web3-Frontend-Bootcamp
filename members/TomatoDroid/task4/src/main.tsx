import React from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
