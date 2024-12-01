/*
 * @Author: Jacket-mzl
 * @Date: 2024-06-26 14:30:15
 * @LastEditors: Jacket-mzl
 * @LastEditTime: 2024-06-26 14:51:38
 * @Description:
 */
"use client";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { cookieToInitialState, http } from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, sepolia } from "wagmi/chains";

const queryClient = new QueryClient();
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "";
const httpSepolia = process.env.NEXT_PUBLIC_INFURA_HTTP_SEPOLIA as string;
console.log(projectId, "projectId");
export const rainbowConfig = getDefaultConfig({
  appName: "mystery-box-market",
  projectId,
  chains: [mainnet, sepolia],
  ssr: true,
  transports: {
    [sepolia.id]: http(httpSepolia),
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={rainbowConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
