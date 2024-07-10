"use client"
import '@/app/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import Head from 'next/head';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import Header from '@/components/modules/Market/Header';
import Content from '@/components/modules/Market/Content';

const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    sepolia,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
});

const client = new QueryClient({});

function Index() {
  return (
    <div>
      <Head>
        <title>WTF NFTMarket</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="nft-marktet"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <main>
        <Header />
        <Content />
      </main>
    </div>
  );
}

function Provider() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider>
          <Index />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default Provider;
