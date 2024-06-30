"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { NextUIProvider } from "@nextui-org/react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import React from "react";
import { ThemeProvider } from "next-themes";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "../wagmiConfig";

const queryClient = new QueryClient();

export function Providers({
  children,
}: // initialState,
Readonly<{
  children: React.ReactNode;
  // initialState: State | undefined;
}>) {
  return (
    <NextUIProvider>
      <ThemeProvider>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>{children}</RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
}
