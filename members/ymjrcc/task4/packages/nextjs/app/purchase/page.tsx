'use client';
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth/useScaffoldWriteContract";

const Purchase: NextPage = () => {
  const [list, setList] = useState<any>([]);
  const { writeContractAsync: writeNFTMarketAsync } = useScaffoldWriteContract("NFTMarket");
  const result = useScaffoldReadContract({
    contractName: "NFTMarket",
    functionName: "getOrders",
  });

  useEffect(() => {
    result.data && setList(result.data);
  }, [result.data]);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(address.length - 4, address.length)}`;
  }

  const handlePurchase = async (item: any) => {
    await writeNFTMarketAsync({
      functionName: "purchase",
      args: [item.NFTAddress, item.tokenId],
    });
  }

  return (
    <div className="text-center mt-8 bg-secondary p-10">
      <h1 className="text-4xl my-0">NFTs On Sell</h1>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {list.length && list.map((item: any, index: number) => (
          <div key={index} className="border border-base-300 p-4 text-left">
              <p>tokenId: {Number(item.tokenId)}</p>
              <p title={item.NFTAddress}>NFTAddress: {formatAddress(item.NFTAddress)}</p>
              <p title={item.owner}>owner: {formatAddress(item.owner)}</p>
              <p>price: {Number(item.price)}</p>
              <button className="bg-primary text-white px-4 py-2 rounded" onClick={() => handlePurchase(item)}>Purchase</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Purchase;
