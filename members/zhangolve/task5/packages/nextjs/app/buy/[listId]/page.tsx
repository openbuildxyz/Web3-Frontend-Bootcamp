"use client";

import { useBalance, useNFTPurchase } from "./utils";
import { formatUnits } from "viem";
import { useNFT } from "~~/app/utils";
import Loading from "~~/components/Loading";
import Success from "~~/components/nft/Success";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { Contract } from "~~/utils/scaffold-eth/contract";

type PageProps = {
  params: { listId: number };
};

const BuyNFT = ({
  listId,
  ERC20ContractData,
  NFTMarketContractData,
  ERC721ContractData,
}: {
  listId: number;
  ERC20ContractData: Contract<"ERC20Token">;
  NFTMarketContractData: Contract<"NFTMarket">;
}) => {
  const [token, isFetching] = useNFT({
    contractAddress: NFTMarketContractData.address,
    abi: NFTMarketContractData.abi,
    ERC721ContractData,
    args: [listId],
  });
  const [balance, isBalanceFetching] = useBalance({
    contractAddress: ERC20ContractData.address,
    abi: ERC20ContractData.abi,
  });

  const [handleWrite, txResult] = useNFTPurchase({
    ERC20ContractData,
    NFTMarketContractData,
    listId,
  });

  const onBuy = () => {
    if (typeof handleWrite === "function") {
      handleWrite([NFTMarketContractData.address, balance]);
    }
  };

  if (isFetching || isBalanceFetching) {
    return <Loading />;
  }

  if (txResult) {
    return <Success />;
  }
  const price = token.price ? `${formatUnits(token.price, 18)}` : 0;
  const tokenId = parseInt(token.tokenId);
  const formattedBalance = balance ? formatUnits(balance, 18) : 0;
  return (
    <div className="flex items-center justify-center">
      <div className="card glass w-120">
        <figure className="w-96 h-96">
          <img src={token.image} alt={token.name} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">NFT info</h2>
          <p>Seller: {token.seller}</p>
          <p>Contract: {token.nftContract}</p>
          <p>Token ID: {tokenId}</p>
          <p>Price: {price}</p>
          <p>Current Balance: {formattedBalance}</p>
          <div className="card-actions justify-end">
            <button className={`btn btn-primary ${balance < token.price ? "btn-disabled" : ""}`} onClick={onBuy}>
              Buy now!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SellNFTPage = ({ params }: PageProps) => {
  const { data: NFTMarketContractData } = useDeployedContractInfo("NFTMarket");
  const { data: ERC20ContractData } = useDeployedContractInfo("ERC20Token");
  const { data: ERC721ContractData } = useDeployedContractInfo("ERC721Token");

  const listId = params?.listId as number;

  if (!NFTMarketContractData || !ERC20ContractData ||!ERC721ContractData) {
    return <Loading />;
  }

  return <BuyNFT listId={listId} ERC20ContractData={ERC20ContractData} NFTMarketContractData={NFTMarketContractData} ERC721ContractData={ERC721ContractData}/>;
};

export default SellNFTPage;
