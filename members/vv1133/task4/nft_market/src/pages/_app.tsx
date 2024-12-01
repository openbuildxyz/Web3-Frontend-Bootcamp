import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import * as dotenv from 'dotenv';
dotenv.config();

const config = getDefaultConfig({
  appName: "NFT Exchange",
  projectId: "1",
  chains: [sepolia, mainnet],
  transports: {
    [sepolia.id]: http(process.env.SEPOLIA_RPC_URL),
    [mainnet.id]: http(process.env.MAIN_RPC_URL)
  },
});

const queryClient = new QueryClient();
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Component {...pageProps}></Component>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
