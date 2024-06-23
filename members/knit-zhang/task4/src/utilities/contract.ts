import { useEthersProvider, useEthersSigner } from "../../ethers";
import { type Contract } from "../type/NFT";
import { Contract as EthersContract } from "ethers";

type useEthersContractProps = "Token" | "NFT" | "Market";

type TokenType = {
  [key in useEthersContractProps]: Contract;
};

export const token: TokenType = {
  Token: {
    address: "0x17FE8E556a9384B78F2CBA08F48ccA87259dE125",
    abi: [
      "function approveForMarket(address market, uint256 price) external",
      "function balanceOf(address owner) public view returns (uint256)",
    ],
  },
  NFT: {
    address: "0x67d1ef8725b06C054f8Da4E5a192EB064cB8B666",
    abi: ["function approvePrice(address market, uint256 tokenId) external"],
  },
  Market: {
    address: "0x0a86EC664B382b6c797Cd8688e5e6d93b8aa1B18",
    abi: [
      "function getItem(uint256 tokenId) public view returns(address, uint256, address, uint256, bool)",
      "function getListedItem() external view returns (uint256[] memory listedCollection)",
      "function listCollection(address collection, uint256 tokenId, uint256 price) external",
      "function unlistCollection(address collection, uint256 tokenId) external",
      "function buyCollection(address collection, uint256 tokenId) external",
      "event ListCollection(uint256 indexed tokenId, uint256 price)",
      "event transferCollection(address from, address indexed to, uint256 indexed tokenId)",
      "event UnlistCollection(uint256 indexed tokenId)",
    ],
  },
};

function createContract(address: string, abi: string[], useSigner: boolean) {
  const provider = useEthersProvider();
  const signer = useEthersSigner();
  if (useSigner) {
    return new EthersContract(address, abi, signer);
  }
  return new EthersContract(address, abi, provider);
}

export default function useEthersContract(
  contractName: useEthersContractProps,
  useSigner: boolean = false
) {
  return createContract(
    token[contractName].address,
    token[contractName].abi,
    useSigner
  );
}
