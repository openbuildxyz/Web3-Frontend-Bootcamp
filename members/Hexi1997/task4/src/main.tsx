import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { WagmiProvider, http } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { sepolia } from 'wagmi/chains'
import { RainbowKitProvider,getDefaultConfig } from '@rainbow-me/rainbowkit'

import '@rainbow-me/rainbowkit/styles.css';
import './index.css'

const config = getDefaultConfig({
  appName: 'Hexi NFT Market',
  projectId: '44eaa28daa81ab702a29f983bfe55279',
  chains: [sepolia],
  transports: {
    [sepolia.id]: http("https://eth-sepolia.g.alchemy.com/v2/4pHUwuXEo8nuTLQqS9E5qSTXx_EpROQQ"),
  },
});

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
