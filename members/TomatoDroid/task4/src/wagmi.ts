import { sepolia } from "wagmi/chains";
import { createConfig, http } from "wagmi";
import { metaMask } from "wagmi/connectors";

const url = 'https://sepolia.infura.io/v3/d02f9226dcf74879985c4c620fa5eca8'

export const config = createConfig({
    chains: [sepolia],
    transports: {
        [sepolia.id]: http(url),
    },
    connectors:[
        // injected(),
        metaMask()
    ]
})