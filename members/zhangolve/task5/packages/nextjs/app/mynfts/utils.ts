import { useEffect, useState } from "react";
import { NFTTokenMetadata } from "../index.d";
import { getTokenData } from "../utils";
import { readContract } from "@wagmi/core";
import { Abi } from "abitype";
import { useAccount, useReadContract } from "wagmi";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";

interface Token extends NFTTokenMetadata {
  tokenId: number;
}
const useNFTs = ({ contractAddress, abi }: { contractAddress: string; abi: Abi }) => {
  const { targetNetwork } = useTargetNetwork();
  const { address: connectedAddress } = useAccount();
  const [tokens, setTokens] = useState<Token[] | null>(null);

  const { data: balance, isFetching: balanceIsFetching } = useReadContract({
    address: contractAddress,
    functionName: "balanceOf",
    abi: abi,
    args: [connectedAddress],
    chainId: targetNetwork.id,
    query: {
      enabled: true,
      retry: false,
    },
  }) as {
    data: bigint;
    isFetching: boolean;
  };

  useEffect(() => {
    if (balance) {
      async function fetchTokens() {
        const tokens = [];
        for (let i = 0; i < balance; i++) {
          // const {data: tokenId, status }
          const tokenId = (await readContract(wagmiConfig, {
            address: contractAddress,
            functionName: "tokenOfOwnerByIndex",
            abi: abi,
            args: [connectedAddress, i],
            chainId: targetNetwork.id,
            query: {
              enabled: true,
              retry: false,
            },
          })) as number;

          const tokenData = await getTokenData({
            abi,
            targetNetwork,
            contractAddress,
            tokenId,
          }) as NFTTokenMetadata;
          tokens.push({
            ...tokenData,
            tokenId,
          });
        }
        setTokens(tokens);
      }
      fetchTokens();
    } else {
      setTokens([]);
    }
  }, [balance]);

  return tokens;
};

export default useNFTs;
