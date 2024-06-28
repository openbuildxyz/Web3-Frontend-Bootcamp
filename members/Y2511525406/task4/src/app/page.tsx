/*
 * @Author: Jacket-mzl
 * @Date: 2024-06-26 14:20:38
 * @LastEditors: Jacket-mzl
 * @LastEditTime: 2024-06-27 09:39:59
 * @Description:
 */
"use client";
import Button from "@/components/Button";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { nftAddress, marketAddress, YZQAddress } from "@/utils/contractAddress";
import { MarketABI, NFTABI, TokenABI } from "@/abi";
import Card from "@/components/Card";
import { Col, List, Row, message } from "antd";
import MintButton from "@/components/MintButton";
import SellButton from "@/components/SellButton";
import ClaimButton from "@/components/ClaimButton.tsx";
import { useState } from "react";
import { parseEther, formatEther } from "viem";
import ApproveButton from "@/components/ApproveButton";
type AddressHash = `0x${string}`;
type NftItem = {
  seller: AddressHash;
  nftContract: AddressHash;
  tokenId: number;
  tokenUrl: string;
  price: bigint;
  listedAt: bigint;
  listing: boolean;
};

export default function Home() {
  const { address } = useAccount();
  const { writeContractAsync, isPending } = useWriteContract();
  const [choseNFTItemId, setChoseNFTItemId] = useState(0);

  const nftTemp = useReadContract({
    address: marketAddress,
    abi: MarketABI,
    functionName: "getAll",
  });
  const nftList = (nftTemp.data || []) as NftItem[];

  const _approveBalance = useReadContract({
    address: YZQAddress,
    abi: TokenABI,
    functionName: "allowance",
    args: [address, marketAddress],
  });
  const approveBalance = _approveBalance?.data || 0;

  const _YZQBalance = useReadContract({
    address: YZQAddress,
    abi: TokenABI,
    functionName: "balanceOf",
    args: [address],
  });
  const YZQBalance = _YZQBalance.data || 0;

  function resolveActionText(nft: NftItem, account: any): string {
    if (!account) {
      return "Buy";
    }

    if (nft.seller === address) {
      return nft.listing ? "Unlist" : "List";
    }

    return nft.listing ? "Buy" : "Not for sale";
  }

  const buyNft = (nft: NftItem) => {
    console.log(nft);
    if (!address) {
      return message.warning("Please connect wallet first.");
    }

    if (!nft.listing) {
      return message.warning(
        `NFT ${nft.nftContract}#${Number(nft.tokenId)} is not for sale.`
      );
    }
    setChoseNFTItemId(nft.tokenId);
    if (nft.seller === address) {
      unlistNFT(nft);
    } else {
      buyNFT(nft);
    }
  };

  const unlistNFT = (nft: NftItem) => {
    writeContractAsync({
      address: marketAddress,
      abi: MarketABI,
      functionName: "unlist",
      args: [nft.nftContract, nft.tokenId],
    })
      .then((res) => {
        console.log("unlist success: ", res);
        message.success("Unlist success");
      })
      .catch((err) => {
        console.log("unlist failed", err.message);
        message.error("Unlist failed");
      })
      .finally(() => setChoseNFTItemId(0));
  };

  const buyNFT = (nft: NftItem) => {
    if (formatEther(approveBalance) < formatEther(nft.price)) {
      message.warning("Your funds are insufficient");
      return;
    }
    writeContractAsync({
      address: marketAddress,
      abi: MarketABI,
      functionName: "buy",
      args: [nft.nftContract, nft.tokenId],
    })
      .then((res: any) => {
        console.log("approve", res);
        message.success("buyNFT success");
      })
      .catch((err: any) => {
        console.log("Approval NFT Failed", err);
        message.error("buyNFT failed");
      })
      .finally(() => setChoseNFTItemId(0));
  };

  return (
    <div>
      <div className="page-navbar flex justify-between items-center p-10 rounded-3xl bg-slate-50 my-4">
        <div>
          <div className="text-xl font-bold">
            YZQ: {formatEther(YZQBalance)}
          </div>
          <div className="text-xl font-bold">
            Approve Balance: {formatEther(approveBalance)}
          </div>
        </div>
        <div className="flex">
          <MintButton></MintButton>
          <SellButton></SellButton>
          <ClaimButton></ClaimButton>
          <ApproveButton balance={YZQBalance}></ApproveButton>
        </div>
      </div>
      <div>
        <Row gutter={16}>
          {nftList.map((item: any, index: number) => {
            return (
              <Col
                className="gutter-row pt-4"
                span={4}
                xs={24}
                sm={12}
                md={8}
                lg={6}
                xxl={4}
                key={index}
              >
                <div className="gutter-box">
                  <Card
                    nftItem={item}
                    btnName={resolveActionText(item, address)}
                    buyNft={buyNft}
                    isLoading={
                      choseNFTItemId == item.tokenId ? isPending : false
                    }
                  ></Card>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
