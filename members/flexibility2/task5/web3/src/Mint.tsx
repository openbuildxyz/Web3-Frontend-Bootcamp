import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Web3FrontedToken from "./abis/Web3FrontedToken.json";
import { hashUrl, WFTAddress } from "./config";
import { useAccount, useWriteContract } from "wagmi";

interface MintNFTData {
  nftAddress: string;
  acountAddress: string;
}

const Mint = () => {
  const account = useAccount();
  const [nftUri, setNftUri] = useState<string>(
    "https://openbuild.xyz/_next/static/media/logo-black.41be43e7.svg"
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MintNFTData>();
  const {
    data: hashMint,
    writeContractAsync: writeContractAsyncMint,
    isPending,
  } = useWriteContract();

  const MintNFT = async () => {
    return await writeContractAsyncMint({
      address: WFTAddress,
      functionName: "mint",
      args: [account.addresses?.[0]],
      abi: Web3FrontedToken,
    });
  };

  const onSubmit = async () => {
    console.log("submit mint");
    await MintNFT();
  };
  const listHashUrl = hashUrl + hashMint;

  return (
    <div className="card">
      <div className="card-header">Mint NFT</div>
      <div className="card-body">
        <h5 className="card-title">NFT Address</h5>
        <p className="card-text">{WFTAddress}</p>
        <h5 className="card-title">Accound Address</h5>
        <p className="card-text">{account.addresses?.[0]}</p>
        <h5 className="card-title">Image url: </h5>
        <input
          type="text"
          value={nftUri}
          onChange={(e) => setNftUri(e.target.value)}
        />
        <img
          src={nftUri}
          width={100}
          height={100}
          style={{ border: "1px solid #ccc", padding: "5px", margin: "5px" }}
        />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => onSubmit()}
        >
          {isPending ? "Minting..." : "Mint NFT"}
        </button>
        {hashMint && (
          <div>
            Mint NFT 成功！ 请点击 <a href={listHashUrl}>{listHashUrl}</a> 查看
          </div>
        )}
      </div>
    </div>
  );
};

export default Mint;
