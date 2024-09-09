import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Buffer } from "buffer";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";
import { Client, cacheExchange, fetchExchange, Provider } from "urql";

import App from "./App.tsx";
import { config } from "./wagmi.ts";

import "./index.css";

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();

const graphClient = new Client({
  url: import.meta.env.VITE_SUBGRAPH_URL,
  exchanges: [cacheExchange, fetchExchange],
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Provider value={graphClient}>
          <App />
        </Provider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
