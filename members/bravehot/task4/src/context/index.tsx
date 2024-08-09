"use client";

import React, { ReactNode } from "react";
import { sepolia } from "viem/chains";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { State, WagmiProvider } from "wagmi";

import { config, projectId } from "@/config";

// Setup queryClient
const queryClient = new QueryClient();

if (!projectId) throw new Error("Project ID is not defined");

// Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
  themeVariables: {
    "--w3m-accent": "#dc2626",
  },
  featuredWalletIds: [],
  defaultChain: sepolia,
  tokens: {
    1: {
      address: "0x034ba171732A6e9AD5B9Be3EBa422896aD1446fB",
    },
  },
});

export default function Web3ModalProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </NextThemesProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
