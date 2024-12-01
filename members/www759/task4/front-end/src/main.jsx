import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import { EthersProvider } from './components/EthersContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <EthersProvider>
      <App />
    </EthersProvider>
  // </React.StrictMode>,
)
