"use client";

import { useEffect, useState } from "react";
import { NFTCard } from "./NFTCard";
import { useAccount } from "wagmi";
import { useScaffoldContract, useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { NFTMetaData } from "~~/utils/simpleNFT/nftsMetadata";

export interface Collectible extends Partial<NFTMetaData> {
  id: number;
  uri: string;
  owner: string;
  price?: string;
}

export const MyHolding = () => {
  const { address: connectedAddress } = useAccount();
  const [myAllCollectibles, setMyAllCollectibles] = useState<Collectible[]>([]);
  const [allCollectiblesLoading, setAllCollectiblesLoading] = useState(false);

  const { data: tomatoNFTContract } = useScaffoldContract({
    contractName: "TomatoNFT",
  });

  const { data: myTotalBalance } = useScaffoldReadContract({
    contractName: "TomatoNFT",
    functionName: "balanceOf",
    args: [connectedAddress],
    watch: true,
  });

  useEffect(() => {
    const updateMyCollectibles = async () => {
      if (myTotalBalance === undefined || tomatoNFTContract === undefined || connectedAddress === undefined) {
        return;
      }

      setAllCollectiblesLoading(true);
      const collectibleUpdate: Collectible[] = [];
      const totalBalance = parseInt(myTotalBalance.toString());
      for (let i = 0; i < totalBalance; i++) {
        try {
          const tokenId = await tomatoNFTContract.read.tokenOfOwnerByIndex([connectedAddress, BigInt(i)]);
          const tokenURI = await tomatoNFTContract.read.tokenURI([tokenId]);

          collectibleUpdate.push({
            id: parseInt(tokenId.toString()),
            uri: tokenURI,
            owner: connectedAddress,
          });
        } catch (error) {
          notification.error("Error fetching all collectibles");
          setAllCollectiblesLoading(false);
          console.log(error);
        }
      }
      collectibleUpdate.sort((a, b) => a.id - b.id);
      setMyAllCollectibles(collectibleUpdate);
      setAllCollectiblesLoading(false);
    };
    updateMyCollectibles();
  }, [connectedAddress, myTotalBalance]);

  if (allCollectiblesLoading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <>
      <div className="my-4">
        <div className="text-2xl px-5">My NFTS</div>
        {myAllCollectibles.length === 0 ? (
          <div className="flex justify-center items-center mt-10">
            <div className="text-2xl text-primary-content">No NFTs Found</div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 my-4 px-5">
            {myAllCollectibles.map(item => (
              <NFTCard key={item.id} nft={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
