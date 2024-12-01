import { cookieStorage, createConfig, createStorage, http } from "wagmi"
import { sepolia } from "wagmi/chains"

import { metaMask } from "wagmi/connectors"

export const config = createConfig({
  chains: [sepolia],
  connectors: [metaMask()],
  transports: {
    [sepolia.id]: http(`https://sepolia.infura.io/v3/${INFURA_API_KEY}`),
  },
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
})
