import { createPublicClient, http, formatEther } from "viem";
import { sepolia } from "viem/chains";
import { NFTMarketABI } from "../constants/abi";
import { pinata } from "@/utils/config";

const NFT_ABI = [
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export type ListingNFT = {
  seller: string;
  nftContract: string;
  tokenId: string;
  price: string;
  erc20Token: string;
  image: string;
  name: string;
};

export const fetchAllListings = async (): Promise<ListingNFT[]> => {
  const client = createPublicClient({
    chain: sepolia,
    transport: http(process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL),
  });

  try {
    const [items, sellers, prices, erc20Tokens] = (await client.readContract({
      address: process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS as `0x${string}`,
      abi: NFTMarketABI,
      functionName: "getAllListedNFTs",
    })) as [
      { nftContract: string; tokenId: bigint }[],
      string[],
      bigint[],
      string[]
    ];

    // 获取每个NFT的tokenURI
    const listings = await Promise.all(
      items.map(async (item, index) => {
        try {
          const tokenURI = (await client.readContract({
            address: item.nftContract as `0x${string}`,
            abi: NFT_ABI,
            functionName: "tokenURI",
            args: [item.tokenId],
          })) as string;

          // 从tokenURI中提取IPFS哈希
          // const ipfsHash = tokenURI.replace('ipfs://', '');

          const url =
            (await pinata.gateways.convert(tokenURI)) +
            `?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_GATEWAY_TOKEN}`;

          return {
            seller: sellers[index],
            nftContract: item.nftContract,
            tokenId: item.tokenId.toString(),
            price: formatEther(prices[index]),
            erc20Token: erc20Tokens[index],
            image: url,
            name: `NFT #${item.tokenId.toString()}`,
          };
        } catch (error) {
          console.error(
            `Error fetching tokenURI for NFT ${item.tokenId}:`,
            error
          );
          return {
            seller: sellers[index],
            nftContract: item.nftContract,
            tokenId: item.tokenId.toString(),
            price: formatEther(prices[index]),
            erc20Token: erc20Tokens[index],
            image: "",
            name: `NFT #${item.tokenId.toString()}`,
          };
        }
      })
    );

    return listings;
  } catch (error) {
    console.error("Error fetching NFT listings:", error);
    throw new Error("Failed to fetch NFT listings");
  }
};
