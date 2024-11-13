import React, { useState } from "react";
import { useWriteContract, useAccount } from "wagmi";
import FederNFTABI from "../contracts/FederNFTABI.json";
import { parseAbi } from "viem";
import { hashUrl, MyNFTAddress } from "../config";


function MintNFT() {
    const account = useAccount();
    const [nftAddress, setNftAddress] = useState<`0x${string}`>(MyNFTAddress);
    const [nftUrl, setNftUrl] = useState<string>("https://openbuild.xyz/_next/static/media/logo-black.41be43e7.svg");
    const {
        data: hashMint,
        writeContractAsync: writeContractAsyncMint,
        isPending: isPendingMint,
    } = useWriteContract();

    const MintNFT = async () => {
        await writeContractAsyncMint({
            address: nftAddress,
            abi: FederNFTABI,
            functionName: "mint"
        });
    };

    return (
        <div style={{ border: "1px solid #ccc", padding: "5px", margin: "5px", width: "45%", height: "400px", float: "left" }}>
      <h2>Mint NFT</h2>
      NFT Contract Address:{" "}
      <input
        type="text"
        placeholder={MyNFTAddress}
        value={nftAddress}
        onChange={(e) => setNftAddress(e.target.value as any)}
      />
      <button className="button" disabled={isPendingMint} onClick={MintNFT}>
        {isPendingMint ? "Minting...." : "Mint NFT"}
      </button>
      {hashMint && (
        <div>
          Mint NFT Successfully！ Please click  <a href={hashUrl + hashMint}>{hashMint}</a> to check the transaction.
        </div>
      )}
    </div>
  );
}


export default MintNFT;

