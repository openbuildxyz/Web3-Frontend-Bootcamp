'use client';
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth/useScaffoldWriteContract";

const Purchase: NextPage = () => {
  const [list, setList] = useState<any>([]);
  const [src, setSrc] = useState("");
  const { writeContractAsync: writeNFTMarketAsync } = useScaffoldWriteContract("NFTMarket");
  const result = useScaffoldReadContract({
    contractName: "NFTMarket",
    functionName: "getOrders",
  });

  const baseURI = useScaffoldReadContract({
    contractName: "YMNFT",
    functionName: "getBaseURI",
  });

  useEffect(() => {
    result.data && setList(result.data);
    baseURI.data && setSrc(baseURI.data);
  }, [result.data, baseURI.data]);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(address.length - 4, address.length)}`;
  }

  const formatTimestamp = (timestamp: number) => {
    return new Date(Number(timestamp) * 1000).toLocaleString();
  }

  const handlePurchase = async (item: any) => {
    await writeNFTMarketAsync({
      functionName: "purchase",
      args: [item.NFTAddress, item.tokenId],
    });
  }

  return (
    <div className="text-center mt-8 bg-secondary p-10">
      <h1 className="text-4xl my-0">NFT Market</h1>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {list.map((item: any, index: number) => (
          <div key={index} className="bg-white p-4 text-left">
              <div className="w-full rounded">
                <img src={src} />
              </div>
              <div className="py-1">tokenId: {Number(item.tokenId)}</div>
              <div className="py-1" title={item.NFTAddress}>NFTAddress: {formatAddress(item.NFTAddress)}</div>
              <div className="py-1" title={item.owner}>owner: {formatAddress(item.owner)}</div>
              <div className="py-1">price: {Number(item.price)}</div>
              <div className="py-1">ListedAt: {formatTimestamp(item.createdAt)}</div>
              <button className="bg-primary text-white px-4 py-2 rounded" onClick={() => handlePurchase(item)}>Purchase</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Purchase;
