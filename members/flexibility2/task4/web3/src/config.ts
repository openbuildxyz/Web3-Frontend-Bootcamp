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
export const NFTExchange = "0xE19E65D830c2C9Db27B185215c2f49Df4a637307";

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
