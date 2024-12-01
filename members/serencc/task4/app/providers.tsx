"use client"

import { cookieToInitialState, State, WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"

import { config } from "@/config"
import { useEffect, useState } from "react"

type ProviderProps = {
  children: React.ReactNode
  cookie?: string | null
}

export const Provider = ({ children, cookie }: ProviderProps) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const queryClient = new QueryClient()
  const initialState = cookieToInitialState(config, cookie)

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
