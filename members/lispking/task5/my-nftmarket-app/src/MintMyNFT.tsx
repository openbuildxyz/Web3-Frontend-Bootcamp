import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import MyNFT from "./contracts/MyNFT.json";
import React from "react";
import { hashUrl, MyNFTAddress } from "./config";

function MintNFT() {
  const account = useAccount();
  const [nftAddress, setNftAddress] = useState<`0x${string}`>(MyNFTAddress);
  const [nftUri, setNftUri] = useState<string>("https://openbuild.xyz/_next/static/media/logo-black.41be43e7.svg");
  const {
    data: hashMint,
    writeContractAsync: writeContractAsyncMint,
    isPending: isPendingMint,
  } = useWriteContract();

  const MintNFT = async () => {
    return await writeContractAsyncMint({
      address: nftAddress,
      abi: MyNFT.abi,
      functionName: "mintNFT",
      args: [account.addresses?.[0], nftUri] as any,
    });
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "5px", margin: "5px", width: "45%", height: "400px", float: "left" }}>
      <h3>铸造 NFT</h3>
      NFT 合约地址：
      <input
        type="text"
        placeholder={MyNFTAddress}
        value={nftAddress}
        onChange={(e) => setNftAddress(e.target.value as any)}
      />
      NFT 图片地址:{" "}
      <input
        type="text"
        value={nftUri}
        onChange={(e) => setNftUri(e.target.value)}
      />
      <img src={nftUri} width={100} height={100} style={{ border: "1px solid #ccc", padding: "5px", margin: "5px" }} />
      <button className="button" disabled={isPendingMint} onClick={MintNFT}>
        {isPendingMint ? "Minting...." : "Mint NFT"}
      </button>
      {hashMint && (
        <div>
          铸造 NFT 成功！ 请点击 <a href={hashUrl + hashMint}>{hashMint}</a> 查看
        </div>
      )}
    </div>
  );
}

export default MintNFT;
