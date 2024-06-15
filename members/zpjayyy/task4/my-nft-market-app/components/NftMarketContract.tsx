import { useWriteContract } from "wagmi";
import { FormEvent } from "react";
import { nftMarketContractConfig } from "@/config/nftMarketContractConfig";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";

export default function NftMarketContract() {
  return (
    <div>
      <List />
      <Purchase />
    </div>
  );
}

function List() {
  const { data: hash, writeContract } = useWriteContract();

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formDate = new FormData(e.target as HTMLFormElement);
    const tokenId = formDate.get("tokenId") as string;
    const price = formDate.get("price") as string;
    writeContract({
      ...nftMarketContractConfig,
      functionName: "list",
      args: [
        "0x452BFD557b3a4Fc39ACB4bbdC0314720012B3395",
        BigInt(tokenId),
        BigInt(price),
      ],
    });
  }

  return (
    <div className="w-1/3 m-4">
      <form onSubmit={submit}>
        <Input type="number" name="tokenId" placeholder="tokenId" required />
        <Input type="number" name="price" placeholder="price" required />
        <Button type="submit">List</Button>
        {hash && <div>transaction hash: {hash}</div>}
      </form>
    </div>
  );
}

function Purchase() {
  const { data: hash, error, writeContract } = useWriteContract();

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formDate = new FormData(e.target as HTMLFormElement);
    const tokenId = formDate.get("tokenId") as string;
    writeContract({
      ...nftMarketContractConfig,
      functionName: "purchase",
      args: ["0x452BFD557b3a4Fc39ACB4bbdC0314720012B3395", BigInt(tokenId)],
    });
  }

  return (
    <div className="w-1/3 m-4">
      <form onSubmit={submit}>
        <Input type="number" name="tokenId" placeholder="tokenId" required />
        <Button type="submit">Purchase</Button>
        {hash && <div>transaction hash: {hash}</div>}
        {error && <div>Error: {error.message}</div>}
      </form>
    </div>
  );
}
