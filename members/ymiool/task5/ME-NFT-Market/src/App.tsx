import './App.css'
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import Header from './components/Header';
import NFTList from './components/NFTList';
import { wagmiConfig } from './config/wagmi-config';
import Menu from './components/Menu';

export interface INFTItem {
  nftContract: string;
  tokenId: bigint;
  seller: string;
  price: bigint;
  addTime: bigint;
  isActive: boolean;
}

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Header></Header>
          <Menu></Menu>
          <NFTList></NFTList>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
