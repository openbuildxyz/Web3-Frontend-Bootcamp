import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import "@rainbow-me/rainbowkit/styles.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"

import { config } from "./config"

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
)
