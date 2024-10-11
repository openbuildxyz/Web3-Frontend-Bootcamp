import Header from "./components/Header";
import Swap from "./components/Swap";
import { Routes, Route } from "react-router-dom";
import { http } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import { infura_connection_networks } from "./resource";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import "./App.css";

const config = getDefaultConfig({
  appName: "Uniswap App",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(infura_connection_networks.mainnet),
  },
});

function App() {
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="App">
            <Header />
            <div className="mainWindow">
              <Routes>
                <Route path="/" element={<Swap />} />
              </Routes>
            </div>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
