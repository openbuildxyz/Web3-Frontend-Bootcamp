"use client";

import { useAccount } from "wagmi";
import Account from "@/components/Account";
import ReadTokenContract from "@/components/ReadTokenContract";
import WalletOptions from "@/components/WalletOptions";

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) {
    return <Account />;
  }
  return <WalletOptions />;
}

export default function Home() {
  return (
    <main>
      <ConnectWallet />
      <ReadTokenContract />
    </main>
  );
}
