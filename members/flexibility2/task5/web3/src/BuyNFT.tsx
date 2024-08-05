import React, { useMemo, useState } from "react";
import { useReadContract, useWriteContract } from "wagmi";

import NFTExchange from "./abis/NFTExchange.json";
import OpenBuildToken from "./abis/OpenBuildToken.json";
import { NFTExchangeAddress, OBTAddress, hashUrl, WFTAddress } from "./config";

const BuyNFT = () => {
  //   const [selectIndex, setSelectIndex] = useState<number>(-1);
  const { data: hash, writeContractAsync, isPending } = useWriteContract();

  const {
    data: hashBuy,
    writeContractAsync: writeContractAsyncBuy,
    isPending: isPendingBuy,
  } = useWriteContract();

  const {
    data: hashDeList,
    writeContractAsync: writeContractAsyncDeList,
    isPending: isPendingDeList,
  } = useWriteContract();

  const result = useReadContract({
    abi: NFTExchange,
    address: NFTExchangeAddress,
    functionName: "getAllListings",
    args: [WFTAddress],
    query: {
      refetchInterval: 3000,
    },
  });

  const listings = useMemo(() => {
    return (
      result.data?.map((x) => ({
        ...x,
      })) ?? []
    );
  }, [result.data]);

  console.log("listings: ", listings);

  const buyHashUrl = hashUrl + hash;
  const DelistHashUrl = hashUrl + hashDeList;

  //   const canBuy = () => {
  //     if (selectIndex === -1) {
  //       return false;
  //     }
  //     const selectItem = listings[selectIndex];
  //     return selectItem.isActivate;
  //   };

  const buyNFT = async (selectItem) => {
    console.log("selectItem: ", selectItem);
    if (!selectItem) {
      return;
    }
    const price = Number(selectItem.price);

    const tokenId = Number(selectItem.tokenId);

    // await writeContractAsync({
    //   address: OBTAddress,
    //   abi: OpenBuildToken,
    //   functionName: "approve",
    //   args: [NFTExchangeAddress, price],
    // });

    await writeContractAsyncBuy({
      address: NFTExchangeAddress,
      functionName: "buyNFT",
      args: [selectItem.nftContract, tokenId],
      abi: NFTExchange,
    });
  };

  const DeListNFT = async (selectItem) => {
    console.log("DeListItem: ", selectItem);
    if (!selectItem) {
      return;
    }

    const tokenId = Number(selectItem.tokenId);

    await writeContractAsyncDeList({
      address: NFTExchangeAddress,
      functionName: "DelistNFT",
      args: [selectItem.nftContract, tokenId, false],
      abi: NFTExchange,
    });
  };

  return (
    <>
      <h3>可售卖NFT列表</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>合约地址</th>
            <th>拥有者</th>
            <th>TokenId</th>
            <th>价格</th>
            <th>上架时间</th>
            <th>是否可以购买</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listings.map((item, index) => (
            <tr key={index}>
              <td> {item.nftContract}</td>
              <td> {item.seller}</td>
              <td>{item.tokenId.toString()}</td>
              <td>{item.price.toString()}</td>
              <td>{new Date().toISOString()}</td>

              <td>{item.isActivate.toString()}</td>

              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => buyNFT(item)}
                  disabled={
                    isPending ||
                    isPendingBuy ||
                    isPendingDeList ||
                    item.isActivate.toString() === "false"
                  }
                >
                  {isPendingBuy ? "Buying..." : "Buy"}
                </button>
              </td>

              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => DeListNFT(item)}
                  disabled={
                    isPending ||
                    isPendingBuy ||
                    isPendingDeList ||
                    item.isActivate.toString() === "false"
                  }
                >
                  {isPendingDeList ? "DeListing..." : "DeList"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>

        {(hashBuy || hashDeList) && (
          <tfoot>
            <tr>
              <td>
                {" "}
                下架NFT 成功！ 请点击 <a href={DelistHashUrl}>{hash}</a> 查看
              </td>
              <td> </td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        )}
      </table>
    </>
  );
};

export default BuyNFT;
