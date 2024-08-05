import '@rainbow-me/rainbowkit/styles.css';
import {
  mainnet,
  sepolia,
  anvil,
} from 'wagmi/chains';
import { http } from 'wagmi'

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {REACT_APP_ALCHEMY_API_KEY} from "./utils/index";
export const config = getDefaultConfig({
  appName: 'Uniswap',
  projectId: '0.0.6',
  chains: [mainnet, sepolia, anvil],
  ssr: true, // If your dApp uses server side rendering (SSR) 
  transports: {
    [mainnet.id]: http(`https://mainnet.infura.io/v3/${REACT_APP_ALCHEMY_API_KEY}`),
    [sepolia.id]: http(`https://sepolia.infura.io/v3/${REACT_APP_ALCHEMY_API_KEY}`),
    [anvil.id]:http(`http://127.0.0.1:8545`),
  },
});