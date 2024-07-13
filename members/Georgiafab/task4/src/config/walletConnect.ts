import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  sepolia,
} from "wagmi/chains";
import { getDefaultConfig, Chain } from "@rainbow-me/rainbowkit";
import { QueryClient } from "@tanstack/react-query";
const localhost = {
  id: 31337,
  name: "localhost-hardhat",
  iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png",
  iconBackground: "#fff",
  nativeCurrency: { name: "localhost-hardhat", symbol: "MYETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545/"] },
  },
  blockExplorers: {
    default: { name: "polygonscan", url: "https://polygonscan.com/" },
  },
  // contracts: {
  //   multicall3: {
  //     address: '0xca11bde05977b3631167028862be2a173976ca11',
  //     blockCreated: 11_907_934,
  //   },
  // },
} as const satisfies Chain;
const env = process.env.NEXT_PUBLIC_EVN;
const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!;
const config = getDefaultConfig({
  appName: "nft collection",
  projectId: walletConnectProjectId,
  chains: [
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    env == "local" ? localhost : env == "test" ? sepolia : mainnet,
  ],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
const queryClient = new QueryClient();

export { config, queryClient };
