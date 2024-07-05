"use client";

import {useNFTs,useDelistNFT} from "./utils";
import Loading from "~~/components/Loading";
import TokenList from "~~/components/nft/TokenList";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { Contract } from "~~/utils/scaffold-eth/contract";

const NFTs = ({ deployedNFTContractData, deployedNFTMarketContractData }: { deployedContractData: Contract<"ERC721Token">, deployedNFTMarketContractData: Contract<"NFTMarket"> }) => {
  const tokens = useNFTs({
    contractAddress: deployedNFTMarketContractData.address,
    abi: deployedNFTMarketContractData.abi,
    deployedNFTContractData
  });
  const [delistNFT, txResult] = useDelistNFT({NFTMarketContractData:deployedNFTMarketContractData})

  if (tokens === null) {
    return <Loading />;
  }

  return (
    <div>
      <TokenList tokens={tokens} type="delist" onDelist={delistNFT}/>
    </div>
  );
};

const MyNFTsPage = () => {
  const { data: deployedNFTContractData } = useDeployedContractInfo("ERC721Token");
  const { data: deployedNFTMarketContractData } = useDeployedContractInfo("NFTMarket");

  if (!deployedNFTContractData || !deployedNFTMarketContractData) {
    return <Loading />;
  }

  return (
    <div>
      <NFTs deployedNFTContractData={deployedNFTContractData} deployedNFTMarketContractData={deployedNFTMarketContractData}/>
    </div>
  );
};

export default MyNFTsPage;
