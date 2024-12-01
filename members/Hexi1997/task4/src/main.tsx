import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { WagmiProvider, webSocket } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { sepolia } from "wagmi/chains";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "@rainbow-me/rainbowkit/styles.css";
import "./index.css";
import { rainbowKitConfig } from "./utils/const.ts";

export const wagmiConfig = getDefaultConfig({
  appName: "Hexi NFT Market",
  // wallet connect project id
  projectId: rainbowKitConfig.projectId,
  chains: [sepolia],
  transports: {
    [sepolia.id]: webSocket(rainbowKitConfig.websocketUrl),
  },
});

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
          <ToastContainer />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
