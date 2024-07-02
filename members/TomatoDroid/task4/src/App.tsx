import { WagmiProvider, useAccount } from 'wagmi'
import './App.css'
import { WalletOptions } from './components/WalletOptions'
import { config } from './wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Account } from './components/Account'
import { NFTMarket } from './components/NFTMarket'
import { MintNFT } from './components/MintNFT'
import { ListNFT } from './components/ListNFT'
import { BuyNFT } from './components/BuyNFT'
import Profile from './components/Profile'

const queryClient = new QueryClient();

function ConnectWallet() {
  const { isConnected } = useAccount()
  if (isConnected) {
    return (
      <>
        <Account />
        <div className='border-b border-gray-900 m-y-2'></div>
        <Profile />
        <div className='border-b border-gray-900 m-y-2'></div>
        <NFTMarket />
        <ListNFT />
        <BuyNFT />
        <MintNFT />
      </>
    )
  }
  return <WalletOptions />
}

function App() {
  return (
    <div>
      <WagmiProvider config={ config }>
        <QueryClientProvider client={queryClient}>
          <ConnectWallet />
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  )
}

export default App
