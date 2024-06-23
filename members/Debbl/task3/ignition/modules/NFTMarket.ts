import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NFT_NAME = "MyNFT";
const NFT_SYMBOL = "MNFT";

const NFTMarketModule = buildModule("NFTMarketModule", (m) => {
  const initialSupply = m.getParameter("initialSupply", 100n);
  const TokenName = m.getParameter("TokenName", "MyERC20Token");
  const TokenSymbol = m.getParameter("TokenSymbol", "MTK");

  const NFTName = m.getParameter("NFTName", NFT_NAME);
  const NFTSymbol = m.getParameter("NFTSymbol", NFT_SYMBOL);

  const token = m.contract("MyERC20Token", [
    initialSupply,
    TokenName,
    TokenSymbol,
  ]);
  const nft = m.contract("MyNFT", [NFTName, NFTSymbol]);
  const market = m.contract("NFTMarket", [token]);

  return { token, nft, market };
});

export default NFTMarketModule;
