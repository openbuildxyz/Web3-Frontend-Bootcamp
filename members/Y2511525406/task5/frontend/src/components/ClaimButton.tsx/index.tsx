/*
 * @Author: Jacket-mzl
 * @Date: 2024-06-26 17:30:45
 * @LastEditors: Jacket-mzl
 * @LastEditTime: 2024-06-26 18:01:11
 * @Description:
 */
"use client";
import Button from "@/components/Button";
import { useWriteContract } from "wagmi";
import { nftAddress, marketAddress, YZQAddress } from "@/utils/contractAddress";
import { MarketABI, NFTABI, TokenABI } from "@/abi";
import { message } from "antd";
export default function ClaimButton() {
  const { writeContractAsync, isPending } = useWriteContract();
  const claimToken = () => {
    writeContractAsync({
      address: YZQAddress,
      abi: TokenABI,
      functionName: "claimToken",
    })
      .then((res: any) => {
        console.log("mint结果", res);
        message.success("Mint Success");
      })
      .catch((err: any) => {
        console.log("Mint Error", err);
        message.error(err.message);
      });
  };
  return (
    <div onClick={claimToken}>
      <Button className="ml-2" isLoading={isPending}>
        Claim 20 YZQ
      </Button>
    </div>
  );
}
