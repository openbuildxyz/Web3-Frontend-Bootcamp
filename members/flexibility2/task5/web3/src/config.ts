import { createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

const rpcUrl =
  "https://eth-sepolia.g.alchemy.com/v2/ueZDCKyPyz416HjBmios2nci0j--tzmA";
export const config = createConfig({
  chains: [sepolia],
  connectors: [injected()],
  transports: {
    [sepolia.id]: http(rpcUrl),
  },
});

export const hashUrl = "https://sepolia.etherscan.io/tx/";
export const OBTAddress = "0x71BcA794230292F96A40c6F0e227a5197127C3D9";
export const WFTAddress = "0xFBDb4f731bada00E95089eDA357d90cDDa555682";
export const NFTExchangeAddress = "0xC000b8155FB6bF0C74d1fCCB7eCAcd223bB1f93D";

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
