import { http, createConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
  connectors: [],
  transports: {
    [sepolia.id]: http('https://eth-sepolia.g.alchemy.com/v2/iO2BGnxbl6eI2lVNpPz-FXsYrQqvvlSs'),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
