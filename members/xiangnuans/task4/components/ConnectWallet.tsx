"use client";

import { Account } from "./Account";
import { Connect } from "./Connect";
import { useAccount } from "wagmi";

export function ConnectWallet() {
  const { isConnected } = useAccount();
  return <div>{isConnected ? <Account /> : <Connect />}</div>;
}
