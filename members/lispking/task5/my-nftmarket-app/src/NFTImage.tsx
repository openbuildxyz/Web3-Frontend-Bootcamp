import React from "react";
import MyNFT from "./contracts/MyNFT.json";
import { useReadContract } from "wagmi";
import { MyNFTAddress } from "./config";

function NFTImage(params) {
  const nftInfo = useReadContract({
    abi: MyNFT.abi,
    address: MyNFTAddress,
    functionName: "tokenURI",
    args: [params.tokenId],
  });
  return <img src={nftInfo.data as string} width={100} height={100} style={{ border: "1px solid #ccc", padding: "5px", margin: "5px" }} />;
}

export default NFTImage;
