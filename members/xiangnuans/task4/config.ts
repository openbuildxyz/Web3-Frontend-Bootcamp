import { cookieStorage, createConfig, createStorage, http } from "wagmi";

import { config as dotenvConfig } from "dotenv"
import { resolve } from "path";
import { sepolia } from "wagmi/chains";

dotenvConfig({ path: resolve(__dirname, "./.env") });

const { INFURA_PROJECT_ID } = process.env;

export const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(`https://sepolia.infura.io/v3/0cf3624435f04a659fe5ed4d1568160f`)
  },
  // storage: createStorage({
  //   storage: cookieStorage
  // }),
  // ssr: true,
})

export const MyTokenAddress = '0x1DaFFf1879700220Aa559276E72c4468DAB8768D';
export const MyNFTAddress = '0xA91B95f362e5B56c5502750e94874F27B986B0B2'
export const NFTMarketAddress = '0x47F9eB89EB8f43f1747dA3Bb4cba5C4e450b8B6E';


export const hashUrl = 'https://sepolia.etherscan.io/tx/'