"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export function ConnectWallet() {
  return (
    <header className="dark:bg-gray-900 flex justify-between items-center w-full h-16 mx-auto px-80 bg-white">
      <h1 className="font-bold  ">NFTMarket</h1>
      <ConnectButton />
    </header>
  );
}
