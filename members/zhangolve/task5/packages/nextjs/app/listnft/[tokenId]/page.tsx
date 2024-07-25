"use client";

import { useState } from "react";
import useWriteMyContract from "../../hooks";
import { parseEther } from "viem";
import Success from "~~/components/nft/Success";
import { useGlobalState } from "~~/services/store/store";

type PageProps = {
  params: { tokenId: number };
};

const ListNFT = ({
  tokenId,
}: {
  tokenId: number;
}) => {
  const NFTMarketContractData = useGlobalState(state => state.NFTMarketContractData);
  const deployedContractData = useGlobalState(state => state.ERC721ContractData);
  const [handleWrite, txResult] = useWriteMyContract({
    contractAddress: deployedContractData.address,
    abi: deployedContractData.abi,
    functionName: "approve",
  });
  const [handleListNFT, txNFTListResult] = useWriteMyContract({
    contractAddress: NFTMarketContractData.address,
    abi: NFTMarketContractData.abi,
    functionName: "listNFT",
  });
  const [price, setPrice] = useState<bigint>(0n);

  return (
    <>
      <div className="text-center mt-8 bg-secondary p-10">
        {!txResult && (
          <>
            <h1 className="text-4xl my-0">Please approve this Transaction</h1>
            <button
              className="btn btn-secondary"
              onClick={() => {
                if (typeof handleWrite === "function") {
                  handleWrite([NFTMarketContractData.address, tokenId]);
                }
              }}
            >
              Approve it now
            </button>
          </>
        )}
        {txResult && !txNFTListResult && (
          <>
            {deployedContractData && (
              <input
                type="text"
                placeholder="How much"
                className="input input-bordered w-full max-w-xs"
                onChange={e => {
                  setPrice(parseEther(e.target.value));
                }}
              />
            )}
            <button
              className="btn btn-active btn-accent"
              onClick={() => {
                if (typeof handleListNFT === "function") {
                  handleListNFT([deployedContractData.address, tokenId, price]);
                }
              }}
            >
              Sell
            </button>
          </>
        )}
        {txNFTListResult && <Success />}
      </div>
    </>
  );
};

const ListNFTPage = ({ params }: PageProps) => {
  const tokenId = params?.tokenId as number;
  return (
    <ListNFT
      tokenId={tokenId}
    />
  );
};

export default ListNFTPage;
