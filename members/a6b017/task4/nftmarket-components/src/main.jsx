import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { WagmiProvider } from 'wagmi';
import { config } from './config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
       <QueryClientProvider client={queryClient}>
         <App />
       </QueryClientProvider>
     </WagmiProvider>
  </React.StrictMode>
);
