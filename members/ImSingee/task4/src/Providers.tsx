import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {http, WagmiProvider} from 'wagmi';
import {
    sepolia
} from 'wagmi/chains';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import {PropsWithChildren} from "react";

const config = getDefaultConfig({
    appName: "Bryan's NFT Market",
    projectId: 'BRYAN_MARKET',
    chains: [sepolia],
    transports: {
        [sepolia.id]: http('https://eth-sepolia.g.alchemy.com/v2/WNRJZpl5qy73tkiexCJKXpENJ0Vkulcx'),
    },
    ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export function Providers({children}: PropsWithChildren) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}