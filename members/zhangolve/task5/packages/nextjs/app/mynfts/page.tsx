"use client";

import useNFTs from "./utils";
import Loading from "~~/components/Loading";
import TokenList from "~~/components/nft/TokenList";
import { useGlobalState } from "~~/services/store/store";

const NFTs = () => {
  const deployedContractData = useGlobalState(state => state.ERC721ContractData);

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

  return (
    <div>
      <NFTs />
    </div>
  );
};

export default MyNFTsPage;
