import { WagmiProvider, createConfig, http } from 'wagmi'
import { artelaTestnet } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import { ReactNode } from 'react'
import { injected } from 'wagmi/connectors'
import PortStream from 'extension-port-stream'
import { MetaMaskInpageProvider } from '@metamask/providers'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let provider: any
try {
  const currentMetaMaskId = 'nkbihfbeogaeaoehlefnkodbefgpgknn'
  const metamaskPort = chrome.runtime.connect(currentMetaMaskId)
  const pluginStream = new PortStream(metamaskPort)
  provider = new MetaMaskInpageProvider(pluginStream)
} catch (e) {
  console.dir(`Metamask connect error `, e)
  // throw e
}

export const config = createConfig(
  getDefaultConfig({
    chains: [artelaTestnet],
    transports: {
      // RPC URL for each chain
      [artelaTestnet.id]: http(),
    },
    connectors: [
      injected({
        target() {
          return {
            id: 'windowProvider',
            name: 'Window Provider',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            provider: provider as any,
          }
        },
      }),
      // metaMask({
      //   injectProvider: true,
      // }),
    ],

    // Required API Keys
    walletConnectProjectId:
      import.meta.env.VITE_PUBLIC_WALLETCONNECT_PROJECT_ID || '',

    // Required App Info
    appName: 'Pet3',

    // Optional App Info
    appDescription: 'Virtual pet with Web3',
  })
)

const queryClient = new QueryClient()

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
