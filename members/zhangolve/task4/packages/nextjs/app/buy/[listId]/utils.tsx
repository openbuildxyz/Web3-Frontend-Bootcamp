import { useEffect } from "react";
import useWriteMyContract from "../../hooks";
import { useAccount, useReadContract } from "wagmi";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { Contract } from "~~/utils/scaffold-eth/contract";

const useBalance = ({ contractAddress, abi }: { contractAddress: string; abi: any }): [bigint, boolean] => {
  const { targetNetwork } = useTargetNetwork();
  const { address: connectedAddress } = useAccount();
  const { data: balance, isFetching } = useReadContract({
    address: contractAddress,
    functionName: "balanceOf",
    abi: abi,
    chainId: targetNetwork.id,
    query: {
      enabled: true,
      retry: false,
    },
    args: [connectedAddress],
  }) as {
    data: bigint;
    isFetching: boolean;
  };
  return [balance, isFetching];
};

const useNFTPurchase = ({
  ERC20ContractData,
  NFTMarketContractData,
  listId,
}: {
  ERC20ContractData: Contract<"ERC20Token">;
  NFTMarketContractData: Contract<"NFTMarket">;
  listId: number;
}) => {
  const [handleWrite, txResult] = useWriteMyContract({
    contractAddress: ERC20ContractData.address,
    abi: ERC20ContractData.abi,
    functionName: "approve",
  });
  const [purchaseNFT, purchaseNFTResult] = useWriteMyContract({
    contractAddress: NFTMarketContractData.address,
    abi: NFTMarketContractData.abi,
    functionName: "purchaseNFT",
  });

  useEffect(() => {
    if (txResult && typeof purchaseNFT == "function") {
      purchaseNFT([listId]);
    }
  }, [txResult]);
  return [handleWrite, purchaseNFTResult];
};

export { useBalance, useNFTPurchase };
