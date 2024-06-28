'use client'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { QueryClient } from '@tanstack/react-query'
import { http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

const rpcUrl =
  'https://eth-sepolia.g.alchemy.com/v2/INSPwS5z2m-z0bN0l5E6XuI-blBKL4Kp'

export const wagmiConfig = getDefaultConfig({
  appName: 'NFTMarket',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(rpcUrl),
  },
  ssr: true,
})

export const client = new QueryClient()
