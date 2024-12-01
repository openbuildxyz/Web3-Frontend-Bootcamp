// app/layout.tsx
"use client";

import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi';
import { config } from '../lib/config';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient()

  return (
    <html lang="en">
      <head>
        <title>NFT Marketplace</title>
        <meta name="description" content="NFT Marketplace with Wagmi and Ethers.js" />
      </head>
      <body>
        <div className="container mx-auto p-4">
          <WagmiProvider config={config} reconnectOnMount={true}>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </WagmiProvider>
        </div>
      </body>
    </html>
  );
}
