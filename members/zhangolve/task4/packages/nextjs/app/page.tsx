"use client";

import useNFTs from "./utils";
import Loading from "~~/components/Loading";
import TokenList from "~~/components/nft/TokenList";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { Contract } from "~~/utils/scaffold-eth/contract";

const NFTs = ({
  deployedContractData,
  deployedNFTContractData,
}: {
  deployedContractData: Contract<"NFTMarket">;
  deployedNFTContractData: Contract<"ERC721Token">;
}) => {
  const [tokens] = useNFTs({
    contractAddress: deployedContractData.address,
    abi: deployedContractData.abi,
    deployedNFTContractData: deployedNFTContractData,
  });
  if (tokens === undefined) {
    return <Loading />;
  }

  return (
    <div>
      <TokenList tokens={tokens} type="buy" />
    </div>
  );
};

const MyNFTsPage = () => {
  const { data: deployedContractData } = useDeployedContractInfo("NFTMarket");
  const { data: deployedNFTContractData } = useDeployedContractInfo("ERC721Token");

  if (!deployedContractData || !deployedNFTContractData) {
    return <Loading />;
  }

  return (
    <div>
      <NFTs deployedContractData={deployedContractData} deployedNFTContractData={deployedNFTContractData} />
    </div>
  );
};

export default MyNFTsPage;
