import { useEffect, useState } from "react";
import { NFTMarketToken, NFTMarketTokenDetailedInfo, NFTTokenMetadata } from "./index.d";
import { readContract } from "@wagmi/core";
import { Abi } from "abitype";
import { useReadContract } from "wagmi";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { ChainWithAttributes } from "~~/utils/scaffold-eth";
import { Contract } from "~~/utils/scaffold-eth/contract";

async function fetchIpfsData(url: string): Promise<NFTTokenMetadata | undefined> {
  try {
    const response = await fetch(url as string);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const nftData = await response.json();
    return nftData;
  } catch (error) {
    console.error("Error fetching IPFS data:", error);
  }
  return undefined;
}

export const getTokenData = async ({
  tokenId,
  contractAddress,
  abi,
  targetNetwork,
}: {
  tokenId: number;
  contractAddress: string;
  abi: Abi;
  targetNetwork: ChainWithAttributes;
}) => {
  const result = (await readContract(wagmiConfig, {
    address: contractAddress,
    functionName: "tokenURI",
    abi: abi,
    args: [tokenId],
    chainId: targetNetwork.id,
    query: {
      enabled: true,
      retry: false,
    },
  })) as string;

  const tokenData = await fetchIpfsData(result);
  return {
    ...tokenData,
    tokenId,
  };
};

export const useNFT = ({
  contractAddress,
  abi,
  args,
}: {
  contractAddress: string;
  abi: Abi;
  args: [number];
}): [NFTMarketToken, boolean] => {
  const { targetNetwork } = useTargetNetwork();
  const { data: token, isFetching } = useReadContract({
    address: contractAddress,
    functionName: "getListing",
    abi: abi,
    chainId: targetNetwork.id,
    args,
    query: {
      enabled: true,
      retry: false,
    },
  }) as {
    data: NFTMarketToken;
    isFetching: boolean;
  };
  return [token, isFetching];
};

const useDetailTokens = ({
  tokens,
  nftContractAddress,
  abi,
  targetNetwork,
}: {
  tokens: any[];
  nftContractAddress: string;
  abi: any;
  targetNetwork: ChainWithAttributes;
}) => {
  const [detailedTokens, setDetailedTokens] = useState<NFTMarketTokenDetailedInfo[]>([]);
  useEffect(() => {
    async function fetchTokens(tokens: NFTMarketToken[]) {
      const newTokens: NFTMarketTokenDetailedInfo[] = [];
      if (tokens?.length > 0) {
        for (let t = 0; t < tokens.length; t++) {
          const token = tokens[t];
          const tokenData = (await getTokenData({
            tokenId: token.tokenId,
            contractAddress: nftContractAddress,
            abi,
            targetNetwork,
          })) as NFTTokenMetadata;
          newTokens.push({ ...token, ...tokenData });
        }
      }
      setDetailedTokens(newTokens);
    }
    fetchTokens(tokens);
  }, [tokens]);
  return detailedTokens;
};

const useNFTs = ({
  contractAddress,
  abi,
  deployedNFTContractData,
}: {
  contractAddress: string;
  abi: any;
  deployedNFTContractData: Contract<"ERC721Token">;
}) => {
  const { targetNetwork } = useTargetNetwork();
  const { data: tokens, isFetching } = useReadContract({
    address: contractAddress,
    functionName: "getListings",
    abi: abi,
    chainId: targetNetwork.id,
    query: {
      enabled: true,
      retry: false,
    },
  }) as { data: NFTMarketToken[]; isFetching: boolean };
  const newTokens = useDetailTokens({
    tokens,
    nftContractAddress: deployedNFTContractData.address,
    abi: deployedNFTContractData.abi,
    targetNetwork,
  });
  return [newTokens, isFetching];
};

export default useNFTs;
