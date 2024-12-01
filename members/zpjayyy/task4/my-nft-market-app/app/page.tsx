"use client";

import { useAccount } from "wagmi";
import Account from "@/components/Account";
import WalletOptions from "@/components/WalletOptions";
import NftContract from "@/components/NftContract";
import NftMarketContract from "@/components/NftMarketContract";

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
      {/*<TokenContract />*/}
      <NftContract />
      <NftMarketContract />
    </main>
  );
}
