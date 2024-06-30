import "@/styles/globals.css"
import "@rainbow-me/rainbowkit/styles.css"
import type { AppProps } from "next/app"

import { ThemeProvider } from "@/components/theme-provider"
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider } from "wagmi"
import {
  // arbitrum,
  // base,
  // mainnet,
  // optimism,
  // polygon,
  anvil,
  sepolia,
} from "wagmi/chains"

const config = getDefaultConfig({
  appName: "NFT Maaaaarket",
  projectId: "YOUR_PROJECT_ID",
  chains:
    process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [sepolia, anvil]
      : [sepolia],
  ssr: true,
})

const client = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider locale="en-US">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Component {...pageProps} />
          </ThemeProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
