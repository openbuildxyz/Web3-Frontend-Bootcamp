import { createConfig, http } from "wagmi";
import { mainnet, sepolia, base, localhost } from "wagmi/chains";
import { injected } from "wagmi/connectors";

const SEPOLIA_ALCHMY_KEY=process.env.NEXT_PUBLIC_SEPOLIA_ALCHMY_KEY??"uf09Y4e5If0Z_o6nhUjwbd6omiVKVVF-";
console.log(SEPOLIA_ALCHMY_KEY);

const config = createConfig({
    chains: [
        sepolia,
        base
    ],
    transports: {
        [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${SEPOLIA_ALCHMY_KEY}`),
        [base.id]: http(),
    },
    connectors: [
        injected({
            target: "metaMask",
        }),
    ],
});

// base chain https://docs.uniswap.org/contracts/v3/reference/deployments/base-deployments
// export const UNI_FACTORY_ADDRESS = '0x33128a8fC17869897dcE68Ed026d694621f6FDfD';
// export const QUOTER_CONTRACT_ADDRESS = '0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a';
// export const ROUTER_ADDRESS = '0xE592427A0AEce92De3Edee1F18E0157C05861564';
// export const SELECT_ALCHEMY_NETWORK = 'base';

// sepolia https://docs.uniswap.org/contracts/v3/reference/deployments/ethereum-deployments
export const UNI_FACTORY_ADDRESS = '0x0227628f3F023bb0B980b67D528571c95c6DaC1c';
export const QUOTER_CONTRACT_ADDRESS = '0xEd1f6473345F45b75F8179591dd5bA1888cf2FB3';
export const ROUTER_ADDRESS = '0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E';
export const SELECT_ALCHEMY_NETWORK = 'sepolia';

export{config, SEPOLIA_ALCHMY_KEY};