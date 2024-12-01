'use client'
import { ThirdwebProvider } from '@thirdweb-dev/react'

export default function ThirdwebClient({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThirdwebProvider
      activeChain="sepolia"
      clientId="5da1e8436a053fe3343dad427113c508"
    >
      {children}
    </ThirdwebProvider>
  )
}
