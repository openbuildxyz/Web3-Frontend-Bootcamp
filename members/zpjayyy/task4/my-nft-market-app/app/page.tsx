"use client";

import { useAccount, WagmiProvider } from "wagmi";
import { config } from "@/config/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Account from "@/components/Account";
import ReadTokenContract from "@/components/ReadTokenContract";
import WalletOptions from "@/components/WalletOptions";


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
        <ReadTokenContract />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
