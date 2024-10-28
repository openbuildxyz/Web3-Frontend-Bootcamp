import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient, } from "@tanstack/react-query";
import { config } from './helper'

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
