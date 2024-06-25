'use client';
import '@/style/globals.css';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi'
import { config } from './config';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { NextUIProvider } from '@nextui-org/react';

const queryClient = new QueryClient();

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <html>
        <body>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <RainbowKitProvider>
                  <NextUIProvider>
                    {children}
                  </NextUIProvider>
              </RainbowKitProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </body>
      </html>
    </>
  );
};

export default RootLayout;
