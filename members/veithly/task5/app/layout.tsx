'use client';
import '@/style/globals.css';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi'
import { config } from './config';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from "./providers";

const queryClient = new QueryClient();

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <html>
        <head>
          <title>NFT Marketplace</title>
        </head>
        <body>
          <Providers>
            <WagmiProvider config={config}>
              <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                      {children}
                </RainbowKitProvider>
              </QueryClientProvider>
            </WagmiProvider>
          </Providers>
        </body>
      </html>
    </>
  );
};

export default RootLayout;
