import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const JAN_1ST_2030 = 1893456000;
const ONE_GWEI: bigint = 1_000_000_000n;
const NFT_NAME = "hwft";
const NFT_SYMBOL = "hw";

const MarketModule = buildModule("NFTMarketModule", (m) => {
  const name = m.getParameter("nftName", NFT_NAME);
  const symbol = m.getParameter("nftSymbol", NFT_SYMBOL);
  const token = m.contract("MyToken");
  const nft = m.contract("MyNft", [name, symbol]);
  const market = m.contract("NFTMarket", [token]);

  return { token, nft, market };
});

export default MarketModule;
