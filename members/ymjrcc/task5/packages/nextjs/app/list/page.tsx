'use client';
import { log } from "console";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldContract } from "~~/hooks/scaffold-eth/useScaffoldContract";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth/useScaffoldWriteContract";

const formatAddress = (address: string | undefined) => {
  if(!address) return "";
  return `${address.slice(0, 6)}...${address.slice(address.length - 4, address.length)}`;
}

const formatTimestamp = (timestamp: number) => {
  return new Date(Number(timestamp) * 1000).toLocaleString();
}

const List: NextPage = () => {
  const { writeContractAsync: writeNFTMarketAsync } = useScaffoldWriteContract("NFTMarket");
  const [tokens, setTokens] = useState<any[]>([]);
  const [tokenId, setTokenId] = useState(0);
  const [src, setSrc] = useState("");
  const [price, setPrice] = useState("");
  const account = useAccount();
  const { data: YMNFT } = useScaffoldContract({
    contractName: "YMNFT",
  });
  console.log(YMNFT);
  
  const result = useScaffoldReadContract({
    contractName: "YMNFT",
    functionName: "tokensOfOwner",
    args: [account.address],
  });

  const baseURI = useScaffoldReadContract({
    contractName: "YMNFT",
    functionName: "getBaseURI",
  });
  
  useEffect(() => {
    result.data && setTokens(result.data?.map(i => Number(i)).reverse());
    baseURI.data && setSrc(baseURI.data);
  }, [result.data]);

  const handleList = async () => {
    console.log(YMNFT?.address, BigInt(tokenId), BigInt(price));
    
    await writeNFTMarketAsync({
      functionName: "list",
      args: [YMNFT?.address, BigInt(tokenId), BigInt(price)],
    });
  }
  return (
    <div className="mt-8 bg-secondary p-10">
      <h1 className="text-4xl my-4 text-center">List My NFTs</h1>
      <div className="flex items-center mt-4">
        <div className="w-10em">Choose the tokenId: </div>
      </div>
      <div className="flex items-center">
        <select className="select select-bordered w-full max-w-xs" value={tokenId} onChange={(e) => setTokenId(Number(e.target.value))}>
          {
            tokens.map(i => <option key={i}>{i}</option>)
          }
        </select>
      </div>
      <div className="flex items-center mt-4">
        <div className="w-10em">Set the price:</div>
      </div>
      <div className="flex items-center">
        <input type="text" className="input input-bordered w-full max-w-xs" value={price} onChange={e => setPrice(e.target.value)} />
      </div>
      <div>
        <button className="bg-primary text-white px-4 py-2 rounded mt-4" onClick={handleList}>List</button>
      </div>
      <hr />
      <h1 className="text-4xl my-4 text-center">My NFTs (Not On Sell)</h1>
      <div className="grid grid-cols-5 gap-4 mt-4">
        {tokens.map((id: any, index: number) => (
          <div key={index} className="bg-white p-4 text-left ">
              <div className="w-full rounded">
                <img src={src} />
              </div>
              <div className="py-1">tokenId: {Number(id)}</div>
              <div className="py-1" title={YMNFT?.address}>NFTAddress: {formatAddress(YMNFT?.address)}</div>
              <div className="py-1" title={account.address}>owner: {formatAddress(account.address)}</div>
          </div>
        ))}
      </div>
      <NFTsOnSell />
    </div>
  );
}

const NFTsOnSell: NextPage = () => {
  const account = useAccount();
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
    result.data && setList(result.data.filter((item: any) => item.owner === account.address));
    baseURI.data && setSrc(baseURI.data);
  }, [result.data, baseURI.data]);

  const handleRevoke = async (item: any) => {
    await writeNFTMarketAsync({
      functionName: "revoke",
      args: [item.NFTAddress, item.tokenId],
    });
  }

  return (
    <div className="text-center">
      <h1 className="text-4xl my-0">My NFTs (On Sell)</h1>
      <div className="grid grid-cols-5 gap-4 mt-4">
        {list.map((item: any, index: number) => (
          <div key={index} className="bg-white p-4 text-left ">
              <div className="w-full rounded">
                <img src={src} />
              </div>
              <div className="py-1">tokenId: {Number(item.tokenId)}</div>
              <div className="py-1" title={item.NFTAddress}>NFTAddress: {formatAddress(item.NFTAddress)}</div>
              <div className="py-1" title={item.owner}>owner: {formatAddress(item.owner)}</div>
              <div className="py-1">price: {Number(item.price)}</div>
              <div className="py-1">ListedAt: {formatTimestamp(item.createdAt)}</div>
              <button className="bg-primary text-white px-4 py-2 rounded" onClick={() => handleRevoke(item)}>Revoke</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;