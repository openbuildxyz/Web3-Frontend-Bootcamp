import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
  hardhat,
  localhost,
} from "wagmi/chains";
import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
  injectedWallet,
  coinbaseWallet,
  imTokenWallet,
  okxWallet,
  coreWallet,
  argentWallet,
  trustWallet,
  uniswapWallet,
  phantomWallet,
} from "@rainbow-me/rainbowkit/wallets";

export const config = getDefaultConfig({
  appName: "my-app-wallet",
  projectId: "428ed73e74f6734023cf4e5232253d90",
  chains: [
    localhost,
    hardhat,
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    sepolia,
  ],
  wallets: [
    {
      groupName: "Popular",
      wallets: [
        metaMaskWallet,
        rainbowWallet,
        walletConnectWallet,
        coinbaseWallet,
      ],
    },
    {
      groupName: "More",
      wallets: [
        okxWallet,
        trustWallet,
        argentWallet,
        uniswapWallet,
        coreWallet,
        imTokenWallet,
        phantomWallet,
        injectedWallet,
      ],
    },
  ],
});