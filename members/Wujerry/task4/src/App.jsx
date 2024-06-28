import { WagmiProvider, useAccount } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { config } from './config'
import Profile from './components/Profile'
import NFTList from './components/NFTList'

import './App.css'
import '@rainbow-me/rainbowkit/styles.css'

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Wrapper></Wrapper>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

function Wrapper() {
  const { address } = useAccount()
  return (
    <div className='w-full'>
      <Profile walletAddr={address}></Profile>
      <NFTList walletAddr={address}></NFTList>
    </div>
  )
}

export default App
