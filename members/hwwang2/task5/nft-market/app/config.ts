import { createConfig, http } from "wagmi";
import { mainnet, sepolia, localhost } from "wagmi/chains";
import { injected } from "wagmi/connectors";


require('dotenv').config();

// const SEPOLIA_ALCHMY_KEY=process.env.NEXT_PUBLIC_SEPOLIA_ALCHMY_KEY;
const SEPOLIA_ALCHMY_KEY=process.env.NEXT_PUBLIC_SEPOLIA_ALCHMY_KEY??"uf09Y4e5If0Z_o6nhUjwbd6omiVKVVF-";
console.log(SEPOLIA_ALCHMY_KEY);

const config = createConfig({
    chains: [sepolia],
    transports: {
        [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${SEPOLIA_ALCHMY_KEY}`),
    },
    connectors: [
        injected({
            target: "metaMask",
        }),
    ],
});

export const NFT_ADDRESS= "0x10Eb32562a2fA9876272ffB7eb6D92aB379D0729";
export const TOKEN_ADDRESS = "0xA33dbCfB40FEBCd596030672120208255A39B842";
export const MARKET_ADDRESS="0xfD51B237f98084B15adA565717ac4775536594E0";

// export const TOKEN_ADDRESS="0xD46d40794893A88Cfe6fc555f5A5806c0EC70d3D";
// export const NFT_ADDRESS="0xDFbfBdA3Bb8c3CfF1b591beaeDB3A9a0AAf8baD7";
// export const MARKET_ADDRESS="0xc34Ba4561c632c75Dc489D8c452838433d3D945E";

export{config, SEPOLIA_ALCHMY_KEY};