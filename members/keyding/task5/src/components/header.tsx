"use client"

import { ThemeModeToggle } from "@/components/theme-mode-toggle"
import { User } from "@/components/user/index"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import Image from "next/image"
import Link from "next/link"

export function Header() {
  return (
    <div className="w-full flex items-center justify-center h-20 sticky top-0 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="w-full max-w-screen-lg flex items-center justify-between ">
        <Link href="/" className="w-[400px] h-auto">
          <Image
            src="/logo.svg"
            width={915}
            height={120}
            alt="NFT MaaaaaRKET"
            className="-mt-2"
            priority
          />
        </Link>
        <div className="flex items-center justify-end gap-2">
          <ConnectButton />
          <User />
          <ThemeModeToggle />
        </div>
      </div>
    </div>
  )
}
