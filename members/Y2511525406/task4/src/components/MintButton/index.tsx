"use Client";
import Button from "@/components/Button";
import { useWriteContract } from "wagmi";
import { nftAddress, marketAddress, YZQAddress } from "@/utils/contractAddress";
import { MarketABI, NFTABI, TokenABI } from "@/abi";
import { message } from "antd";
export default function MintButton() {
  const { writeContractAsync, isPending } = useWriteContract();
  const mintNFT = () => {
    writeContractAsync({
      address: nftAddress,
      abi: NFTABI,
      functionName: "mint",
    })
      .then((res: any) => {
        console.log("mint结果", res);
        message.success("Mint Success");
      })
      .catch((err: any) => {
        console.log("Mint Error", err);
        message.error("Mint Error");
      });
  };
  return (
    <div onClick={mintNFT}>
      <Button className="ml-2" isLoading={isPending}>
        Mint
      </Button>
    </div>
  );
}
