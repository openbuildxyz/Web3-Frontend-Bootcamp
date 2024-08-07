import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./assets/global.css"
import "@rainbow-me/rainbowkit/styles.css"
import { ThemeProvider } from "@/components/app/theme-provider.tsx"
import { WAGMI_CONFIG } from "@/lib/constants"
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider } from "wagmi"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="snow-ui-theme">
      <WagmiProvider config={WAGMI_CONFIG}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={darkTheme()}>
            <App />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
