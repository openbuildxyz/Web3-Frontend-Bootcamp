import { createConfig, http } from "wagmi";
import { mainnet, sepolia, base, localhost, baseSepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

const SEPOLIA_ALCHMY_KEY=process.env.NEXT_PUBLIC_SEPOLIA_ALCHMY_KEY??"uf09Y4e5If0Z_o6nhUjwbd6omiVKVVF-";
console.log(SEPOLIA_ALCHMY_KEY);

const config = createConfig({
    chains: [
        sepolia,
        base,
        baseSepolia
    ],
    transports: {
        [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${SEPOLIA_ALCHMY_KEY}`),
        [baseSepolia.id]: http(`https://base-sepolia.g.alchemy.com/v2/${SEPOLIA_ALCHMY_KEY}`),
        [base.id]: http(),
    },
    connectors: [
        injected({
            target: "metaMask",
        }),
    ],
});

// base chain https://docs.uniswap.org/contracts/v3/reference/deployments/base-deployments
export const UNI_FACTORY_ADDRESS = '0x33128a8fC17869897dcE68Ed026d694621f6FDfD';
export const QUOTER_CONTRACT_ADDRESS = '0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a';
export const ROUTER_ADDRESS = '0x2626664c2603336E57B271c5C0b26F421741e481';
export const SELECT_ALCHEMY_NETWORK = 'base';

// // base sepolia https://docs.uniswap.org/contracts/v3/reference/deployments/base-deployments
// export const UNI_FACTORY_ADDRESS = '0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24';
// export const QUOTER_CONTRACT_ADDRESS = '0xC5290058841028F1614F3A6F0F5816cAd0df5E27';
// export const ROUTER_ADDRESS = '0x94cC0AaC535CCDB3C01d6787D6413C739ae12bc4';
// export const SELECT_ALCHEMY_NETWORK = 'base-sepolia';

// // sepolia https://docs.uniswap.org/contracts/v3/reference/deployments/ethereum-deployments
// export const UNI_FACTORY_ADDRESS = '0x0227628f3F023bb0B980b67D528571c95c6DaC1c';
// export const QUOTER_CONTRACT_ADDRESS = '0xEd1f6473345F45b75F8179591dd5bA1888cf2FB3';
// export const ROUTER_ADDRESS = '0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E';
// export const SELECT_ALCHEMY_NETWORK = 'sepolia';


export const MAX_FEE_PER_GAS = 210000;
export const MAX_PRIORITY_FEE_PER_GAS = 210000;

export{config, SEPOLIA_ALCHMY_KEY};