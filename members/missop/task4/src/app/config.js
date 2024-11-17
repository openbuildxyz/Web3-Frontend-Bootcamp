import { http } from "wagmi";
import { hardhat } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

export default getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [hardhat],
  ssr: true, // If your dApp uses server side rendering (SSR)
  transports: {
    [hardhat.id]: http(),
  },
});
