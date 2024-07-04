import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Logo } from "./logo"
import { ModeToggle } from "./mode-toggle"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="m-auto flex h-24 max-w-screen-lg items-center">
        <Logo />
        <div className="flex-1 flex items-center justify-end gap-2">
          <ConnectButton />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
