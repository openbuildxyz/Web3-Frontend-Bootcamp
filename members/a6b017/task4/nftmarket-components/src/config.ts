import { http, createConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected, metaMask } from 'wagmi/connectors'

const projectId = '<WALLETCONNECT_PROJECT_ID>'

export const config = createConfig({
  chains: [sepolia],
  connectors: [],
  transports: {
    [sepolia.id]: http('https://eth-sepolia.g.alchemy.com/v2/GLrYpfor7iSH-dAwnvTNEDjWaagWnxmm'),
  },
})

declare module 'wagmi' {
    interface Register {
      config: typeof config
    }
}