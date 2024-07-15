import { http, createConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'

export const config = createConfig({
  chains: [sepolia],
  connectors: [],
  transports: {
    [sepolia.id]: http('https://sepolia.infura.io/v3/5641cc67e3a44e6399c43dcff5a93fc1'),
  },
})

export const hashUrl = 'https://sepolia.etherscan.io/tx/'

export const MyTokenAddress = '0xE69DCaE5A6cA1DCE3beBfd5264a83436951c6F43';
export const MyNFTAddress = '0xdD65F5D3a5AEE68769267a5663CCcD213b45ABaA';
export const NFTMarketAddress = '0xEE9e3a49eCA927933Ef08c742ce2E0a89bEDd419';

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}