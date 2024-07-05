"use client";

import useNFTs from "./utils";
import Loading from "~~/components/Loading";
import TokenList from "~~/components/nft/TokenList";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { Contract } from "~~/utils/scaffold-eth/contract";

const NFTs = ({ deployedContractData }: { deployedContractData: Contract<"ERC721Token"> }) => {
  const tokens = useNFTs({
    contractAddress: deployedContractData.address,
    abi: deployedContractData.abi,
  });

  if (tokens === null) {
    return <Loading />;
  }

  return (
    <div>
      <TokenList tokens={tokens} type="sell" />
    </div>
  );
};

const MyNFTsPage = () => {
  const { data: deployedContractData } = useDeployedContractInfo("ERC721Token");

  if (!deployedContractData) {
    return <Loading />;
  }

  return (
    <div>
      <NFTs deployedContractData={deployedContractData} />
    </div>
  );
};

export default MyNFTsPage;
