// src/components/Header.tsx
import { ConnectButton } from '@rainbow-me/rainbowkit'

function Header() {
  return (
    <div className="flex justify-end mb-4">
      <ConnectButton accountStatus={{
        smallScreen: 'avatar',
        largeScreen: 'full',
      }} />
    </div>
  )
}

export default Header
