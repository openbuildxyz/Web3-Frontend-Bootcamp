import { WagmiProvider } from 'wagmi'
import { config } from './wagmi-config.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

const queryClient = new QueryClient()
type DomType = {
  children: React.ReactNode
}
export const Provider: React.FC<DomType> = ({ children }) => {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}