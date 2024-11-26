"use client";

import { useAccount } from "wagmi";

import { Account } from "./wagmi-account";
import { Connect } from "./wagmi-connect";

export function ConnectWallet() {
  const { isConnected } = useAccount();
  return (
    <div className="mr-2 flex items-center">
      {isConnected ? <Account /> : <Connect />}
    </div>
  );
}
