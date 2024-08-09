"use client";

import { useEffect, useRef } from "react";
import { MyHolding } from "./_components/MyHolding";
import { MyMarket } from "./_components/MyMarket";
import type { NextPage } from "next";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import nftsMetadata from "~~/utils/simpleNFT/nftsMetadata";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const { writeContractAsync } = useScaffoldWriteContract("TomatoNFT");

  const { data: tokenId } = useScaffoldReadContract({
    contractName: "TomatoNFT",
    functionName: "getTokenId",
    watch: true,
  });
  const { data: balance } = useScaffoldReadContract({
    contractName: "TomatoToken",
    functionName: "balanceOf",
    args: [connectedAddress],
    watch: true,
  });

  const currentBalance = useRef("");

  useEffect(() => {
    if (balance === undefined) {
      return;
    }
    currentBalance.current = formatUnits(balance, 9);
  }, [balance, connectedAddress]);

  async function mint() {
    // circle back to the zero item if we've reached the end of the array
    if (tokenId === undefined) return;
    const tokenIdNumber = Number(tokenId);
    const currentTokenMetaData = nftsMetadata[tokenIdNumber % nftsMetadata.length];
    const notificationId = notification.loading("Uploading to IPFS");
    try {
      // First remove previous loading notification and then show success notification
      notification.remove(notificationId);
      await writeContractAsync({
        functionName: "safeMint",
        args: [connectedAddress, currentTokenMetaData.image],
      });
    } catch (error) {
      notification.remove(notificationId);
      console.error(error);
    }
  }

  return (
    <>
      <div className="flex justify-center pt-2 items-center space-x-6">
        <div className="space-x-2">
          <span className="text-base">balance:</span>
          <span className="text-2xl">{currentBalance.current}</span>
          <span className="text-base">TAT</span>
        </div>
        <button className="h-10 btn btn-primary btn-sm px-2 rounded-md" onClick={mint}>
          Mint
        </button>
      </div>
      <MyHolding />
      <MyMarket />
    </>
  );
};

export default Home;
