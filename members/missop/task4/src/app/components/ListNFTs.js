import { useGetListsNFTs, useWrite } from "@/hooks/contract";
import React from "react";
import { useAccount } from "wagmi";

export default function ListNFTs() {
  const { address } = useAccount();
  const listNFTs = useGetListsNFTs() || [];
  console.log("listNFTs", listNFTs);
  const { approveAmount, buyNFT } = useWrite();
  return (
    <div className="flex gap-4 flex-wrap">
      {listNFTs.map((nft, index) => (
        <div key={index} className="rounded-md w-1/4 bg-gray-800 p-4">
          <img src={nft.image} alt={nft.name} />
          <h2>NFT：#{nft.tokenId.toString()}</h2>
          <p>持有者：{nft.seller}</p>
          <p>价格：{nft.price.toString()}MT</p>
          <button
            className="bg-blue-500 px-4 py-2 rounded-md mt-4"
            onClick={async () => {
              if (nft.seller === address) {
                alert("已经拥有该 NFT，无法购买！");
                return;
              }
              await approveAmount(1000000);
              const res = await buyNFT(nft.tokenId.toString());
              if (res) {
                alert("购买成功");
              }
            }}
          >
            购买
          </button>
        </div>
      ))}
    </div>
  );
}
