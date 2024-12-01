import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, linea, lineaSepolia } from 'wagmi/chains'

export const config = createConfig({
  chains: [linea, lineaSepolia, mainnet, sepolia],
  transports: {
    [linea.id]: http(),
    [lineaSepolia.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
