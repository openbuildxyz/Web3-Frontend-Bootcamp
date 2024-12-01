"use client"

import { ConnectWallet } from "@/components/connect-wallet"
export const NavBar = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-2xl text-neutral-600 font-bold p-4">NFTs Market</div>
      <div className="m-4">
        <ConnectWallet />
      </div>
    </div>
  )
}
