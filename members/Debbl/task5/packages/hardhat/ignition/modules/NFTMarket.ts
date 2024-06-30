import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

const INITIAL_SUPPLY = parseEther("1000");
const TOKEN_NAME = "MyERC20Token";
const TOKEN_SYMBOL = "MTK";

const NFT_NAME = "MyNFT";
const NFT_SYMBOL = "MNFT";

const NFTMarketModule = buildModule("NFTMarketModule", (m) => {
  const initialSupply = m.getParameter("initialSupply", INITIAL_SUPPLY);
  const TokenName = m.getParameter("TokenName", TOKEN_NAME);
  const TokenSymbol = m.getParameter("TokenSymbol", TOKEN_SYMBOL);

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
