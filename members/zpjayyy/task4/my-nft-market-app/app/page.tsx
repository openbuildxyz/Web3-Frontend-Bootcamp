"use client";

import { useAccount, WagmiProvider } from "wagmi";
import { config } from "@/app/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Account from "@/components/Account";

const WalletOptions = dynamic(() => import("@/components/WalletOptions"), {
  ssr: false,
});

const queryClient = new QueryClient();

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) {
    return <Account />;
  }
  return <WalletOptions />;
}

export default function Home() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectWallet />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
