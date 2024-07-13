import React, { FormEvent } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Web3FrontedToken from "./abis/Web3FrontedToken.json";
import NFTExchange from "./abis/NFTExchange.json";
import { hashUrl, WFTAddress, NFTExchangeAddress } from "./config";
import { useWriteContract } from "wagmi";

interface ListNFTData {
  contractAddress: string;
  tokenId: number;
  price: number;
}

const ListNFT = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ListNFTData>();
  const { data, writeContractAsync, isPending } = useWriteContract();
  const {
    data: hashItem,
    writeContractAsync: writeContractAsyncItem,
    isPending: isPendingItem,
  } = useWriteContract();

  const setApprovalForAll = async (contractAddress: string) => {
    return await writeContractAsync({
      address: WFTAddress,
      functionName: "setApprovalForAll",
      args: [contractAddress, true],
      abi: Web3FrontedToken,
    });
  };

  const listOneNft = async (
    contractAddress: string,
    tokenId: number,
    price: number
  ) => {
    return await writeContractAsyncItem({
      address: NFTExchangeAddress,
      functionName: "listNFT",
      args: [contractAddress, tokenId, price],
      abi: NFTExchange,
    });
  };

  const onSubmit = async (data: FieldValues) => {
    console.log("submit: ", data);
    // await setApprovalForAll(data.contractAddress);
    await listOneNft(data.contractAddress, data.tokenId, data.price);
  };
  const listHashUrl = hashUrl + hashItem;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          NFT合约地址
        </label>
        <input
          type="text"
          className="form-control"
          placeholder={WFTAddress}
          {...register("contractAddress", { required: true })}
        />
        {errors?.contractAddress?.type === "required" && (
          <p className="text-danger">NFT合约地址不能为空</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          TokenId
        </label>
        <input
          type="number"
          className="form-control"
          {...register("tokenId", { required: true, min: 1 })}
        />
        {errors?.tokenId && <p className="text-danger">NFT的tokenId不合适</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          Price
        </label>
        <input
          type="number"
          className="form-control"
          {...register("price", { required: true, min: 1 })}
        />
        {errors?.price && <p className="text-danger">NFT的price最小为1</p>}
      </div>
      <button type="submit" className="btn btn-primary">
        {isPending
          ? "setApproveAll..."
          : isPendingItem
          ? "listNFT..."
          : "List NFT"}
      </button>
      {hashItem && (
        <div>
          上架 NFT 成功！ 请点击 <a href={listHashUrl}>{listHashUrl}</a> 查看
        </div>
      )}
    </form>
  );
};

export default ListNFT;
