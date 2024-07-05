import { NFTTokenMetadata } from "../index.d";
import { Abi } from "abitype";
import { useAccount, useReadContract } from "wagmi";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import {useDetailTokens} from '~~/app/utils';
import useWriteMyContract from '~~/app/hooks';
import { Contract } from "~~/utils/scaffold-eth/contract";


interface Token extends NFTTokenMetadata {
  tokenId: number;
}


const useNFTs = ({ contractAddress, abi, deployedNFTContractData }: { contractAddress: string; abi: Abi }) => {
  const { targetNetwork } = useTargetNetwork();
  const { address: connectedAddress } = useAccount();

  const { data: sellerListings, isFetching: balanceIsFetching } = useReadContract({
    address: contractAddress,
    functionName: "getSellerListings",
    abi: abi,
    args: [connectedAddress],
    chainId: targetNetwork.id,
    query: {
      enabled: true,
      retry: false,
    },
  }) as {
    data: any[];
    isFetching: boolean;
  };
  const tokens = useDetailTokens({
    tokens: sellerListings,
    nftContractAddress: deployedNFTContractData.address,
    abi: deployedNFTContractData.abi,
    targetNetwork,
  })
  return tokens;
};



const useDelistNFT = ({
  NFTMarketContractData,
}: {
  NFTMarketContractData: Contract<"NFTMarket">;
  listId: number;
}) => {
  const [delistNFT, txResult] = useWriteMyContract({
    contractAddress: NFTMarketContractData.address,
    abi: NFTMarketContractData.abi,
    functionName: "delistNFT",
  });
  
  return [delistNFT, txResult];
};

export { useNFTs, useDelistNFT };


export default useNFTs;
