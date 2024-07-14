import React, { useMemo, useState } from "react";
import { hashUrl, OBTAddress, NFTExchangeAddress } from "./config";
import NFTExchange from "./abis/NFTExchange.json";
import OpenBuildToken from "./abis/OpenBuildToken.json";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
const BuyList = () => {
  //   const [selectIndex, setSelectIndex] = useState<number>(-1);
  const { data: hash, writeContractAsync, isPending } = useWriteContract();

  const {
    data: hashBuy,
    writeContractAsync: writeContractAsyncBuy,
    isPending: isPendingBuy,
  } = useWriteContract();

  const result = useReadContract({
    abi: NFTExchange,
    address: NFTExchangeAddress,
    functionName: "getAllListings",
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

    await writeContractAsync({
      address: OBTAddress,
      abi: OpenBuildToken,
      functionName: "approve",
      args: [NFTExchangeAddress, price],
    });

    await writeContractAsyncBuy({
      address: NFTExchangeAddress,
      functionName: "buyNFT",
      args: [selectItem.nftContract, tokenId],
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
            <th>TokenId</th>
            <th>价格</th>
            <th>是否可以购买</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listings.map((item, index) => (
            <tr key={index}>
              <td> {item.nftContract}</td>
              <td>{item.tokenId.toString()}</td>
              <td>{item.price.toString()}</td>
              <td>{item.isActivate.toString()}</td>

              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => buyNFT(item)}
                  disabled={
                    isPending ||
                    isPendingBuy ||
                    item.isActivate.toString() === "false"
                  }
                >
                  Buy
                </button>
              </td>
            </tr>
          ))}
        </tbody>

        {hashBuy && (
          <tfoot>
            <tr>
              <td>
                {" "}
                购买 NFT 成功！ 请点击 <a href={buyHashUrl}>{hash}</a> 查看
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

export default BuyList;
