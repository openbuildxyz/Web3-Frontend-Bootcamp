import '@rainbow-me/rainbowkit/styles.css';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { NextUIProvider } from "@nextui-org/react";
import "./tailwind.css";


import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient, } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: '67887bdfe751c16fbb644598b0330cd7',
  chains: [mainnet, sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <NextUIProvider>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <RainbowKitProvider>
                {children}
              </RainbowKitProvider>
            </QueryClientProvider>
          </WagmiProvider>
          <ScrollRestoration />
          <Scripts />
        </NextUIProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
