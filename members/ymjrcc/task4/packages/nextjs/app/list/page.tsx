'use client';
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldContract } from "~~/hooks/scaffold-eth/useScaffoldContract";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth/useScaffoldWriteContract";

const List: NextPage = () => {
  const { writeContractAsync: writeNFTMarketAsync } = useScaffoldWriteContract("NFTMarket");
  const [tokens, setTokens] = useState<any[]>([]);
  const [tokenId, setTokenId] = useState(0);
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
  
  useEffect(() => {
    result.data && setTokens(result.data?.map(i => Number(i)).reverse());
  }, [result.data]);

  const handleList = async () => {
    await writeNFTMarketAsync({
      functionName: "list",
      args: [YMNFT?.address, 0n, 100n],
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
    </div>
  );
}

export default List;