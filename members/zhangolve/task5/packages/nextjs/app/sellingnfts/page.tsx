"use client";

import {useNFTs,useDelistNFT} from "./utils";
import Loading from "~~/components/Loading";
import TokenList from "~~/components/nft/TokenList";
import { useGlobalState } from "~~/services/store/store";


const NFTs = () => {
  const deployedNFTMarketContractData = useGlobalState(state => state.NFTMarketContractData);
  const deployedNFTContractData = useGlobalState(state => state.ERC721ContractData);

  const tokens = useNFTs({
    contractAddress: deployedNFTMarketContractData.address,
    abi: deployedNFTMarketContractData.abi,
    deployedNFTContractData
  });
  const [delistNFT, txResult] = useDelistNFT({NFTMarketContractData:deployedNFTMarketContractData})

  if (tokens === null) {
    return <Loading />;
  }

  if (txResult) {
    return (<div className="flex items-center flex-col mt-10">
      <div className="text-primary-content my-4">Transaction submitted: {txResult?.transactionHash}</div>
      <div className="text-primary-content my-4">Waiting for confirmation...</div>
      <button
        onClick={() => {
          window.location.reload();
        }}
        className="btn btn-primary"
      >Refresh the Page</button>
    </div>);
  };

  return (
    <div>
      <TokenList tokens={tokens} type="delist" onDelist={delistNFT}/>
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
