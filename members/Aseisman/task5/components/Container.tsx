import type { PropsWithChildren } from 'react'
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import {
    arbitrum,
    base,
    mainnet,
    optimism,
    polygon,
    sepolia
} from 'wagmi/chains'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app';

// import { createConfig, http } from 'wagmi'
// const config = createConfig({
//     chains: [sepolia],
//     transports: {
//         [mainnet.id]: http(),
//         [sepolia.id]: http()
//     }
// })

const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains: [mainnet, polygon, optimism, arbitrum, base, sepolia, ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : [])],
    ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient()

function Container(props: PropsWithChildren) {
// function Container({ Component, pageProps }: AppProps) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {props.children}
                    {/* <Component {...pageProps} /> */}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}

export default Container