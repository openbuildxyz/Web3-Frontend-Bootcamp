"use client";

import { useState } from "react";
import useWriteMyContract from "../../hooks";
import { parseEther } from "viem";
import Loading from "~~/components/Loading";
import Success from "~~/components/nft/Success";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { Contract } from "~~/utils/scaffold-eth/contract";

type PageProps = {
  params: { tokenId: number };
};

const ListNFT = ({
  tokenId,
  deployedContractData,
  NFTMarketContractData,
}: {
  tokenId: number;
  deployedContractData: Contract<"ERC721Token">;
  NFTMarketContractData: Contract<"NFTMarket">;
}) => {
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
  const { data: deployedContractData } = useDeployedContractInfo("ERC721Token");
  const { data: NFTMarketContractData } = useDeployedContractInfo("NFTMarket");
  const tokenId = params?.tokenId as number;

  if (!deployedContractData || !NFTMarketContractData) {
    return <Loading />;
  }

  return (
    <ListNFT
      tokenId={tokenId}
      deployedContractData={deployedContractData}
      NFTMarketContractData={NFTMarketContractData}
    />
  );
};

export default ListNFTPage;
