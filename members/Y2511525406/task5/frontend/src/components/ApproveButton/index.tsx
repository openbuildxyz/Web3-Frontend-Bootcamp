/*
 * @Author: Jacket-mzl
 * @Date: 2024-06-26 22:39:42
 * @LastEditors: Jacket-mzl
 * @LastEditTime: 2024-06-26 22:56:41
 * @Description:
 */
"use Client";
import Button from "@/components/Button";
import { useWriteContract } from "wagmi";
import { nftAddress, marketAddress, YZQAddress } from "@/utils/contractAddress";
import { MarketABI, NFTABI, TokenABI } from "@/abi";
import { message } from "antd";
export default function approveButton(props: any) {
  const { balance } = props;
  const { writeContractAsync, isPending } = useWriteContract();
  const approveNFT = () => {
    writeContractAsync({
      address: YZQAddress,
      abi: TokenABI,
      functionName: "approve",
      args: [marketAddress, balance],
    })
      .then((res: any) => {
        console.log("approve结果", res);
        message.success("approve Success");
      })
      .catch((err: any) => {
        console.log("approve Error", err);
        message.error("approve Error");
      });
  };
  return (
    <div onClick={approveNFT}>
      <Button className="ml-2" isLoading={isPending}>
        Approve YZQ
      </Button>
    </div>
  );
}
