import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from './wagmi';
import Market from './components/Market';
import UserCenter from './components/UserCenter';
import Header from './components/Header';

function App() {

  const queryClient = new QueryClient();
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <Market />
          <Header />
          <UserCenter />
        </QueryClientProvider>
      </WagmiProvider>
    </>
  )
}

export default App
