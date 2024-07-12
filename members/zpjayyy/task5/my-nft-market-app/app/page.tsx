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
    <main className="dark text-foreground bg-background flex flex-row">
      <div className="">
        <ConnectWallet/>
        <NftContract />
      </div>
      {/*<TokenContract />*/}
      <div className="flex-1">
        <NftMarketContract />
      </div>
    </main>
  );
}
