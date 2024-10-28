import { cookieStorage, createConfig, createStorage, http } from "wagmi"
import { mainnet } from "wagmi/chains"
import { metaMask } from "wagmi/connectors"

export const infura_connection = ""

export const config = createConfig({
  chains: [mainnet],
  connectors: [metaMask()],
  transports: {
    [mainnet.id]: http(infura_connection),
  },
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
})
