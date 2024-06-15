import { useWatchContractEvent, useWriteContract } from "wagmi";
import { FormEvent, useState } from "react";
import { nftMarketContractConfig } from "@/config/nftMarketContractConfig";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { nftContractConfig } from "@/config/nftContractConfig";
import { tokenContractConfig } from "@/config/tokenContractConfig";
import { ethers } from "ethers";

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
  const [tokenId, setTokenId] = useState<bigint>();
  const [price, setPrice] = useState<bigint>();

  useWatchContractEvent({
    ...nftContractConfig,
    eventName: "Approval",
    onLogs(logs) {
      console.log(logs);
      // approved
      if (tokenId && price) {
        list(tokenId, price).catch((error) => console.log(error));
      }
    },
  });

  async function approve(tokenId: bigint) {
    writeContract({
      ...nftContractConfig,
      functionName: "approve",
      args: [nftMarketContractConfig.address, BigInt(tokenId)],
    });
  }

  async function list(tokenId: bigint, price: bigint) {
    writeContract({
      ...nftMarketContractConfig,
      functionName: "list",
      args: [nftContractConfig.address, BigInt(tokenId), BigInt(price)],
    });
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formDate = new FormData(e.target as HTMLFormElement);
    const tokenId = BigInt(formDate.get("tokenId") as string);
    const price = BigInt(formDate.get("price") as string);
    setTokenId(tokenId);
    setPrice(price);
    await approve(tokenId);
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

  const [tokenId, setTokenId] = useState<bigint>();

  useWatchContractEvent({
    ...tokenContractConfig,
    eventName: "Approval",
    onLogs(logs) {
      console.log(logs);
      // approved
      if (tokenId) {
        purchase(tokenId).catch((error) => console.log(error));
      }
    },
  });

  async function approve() {
    writeContract({
      ...tokenContractConfig,
      functionName: "approve",
      args: [nftMarketContractConfig.address, ethers.parseEther("1")],
    });
  }

  async function purchase(tokenId: bigint) {
    writeContract({
      ...nftMarketContractConfig,
      functionName: "purchase",
      args: [nftContractConfig.address, BigInt(tokenId)],
    });
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formDate = new FormData(e.target as HTMLFormElement);
    const tokenId = BigInt(formDate.get("tokenId") as string);
    setTokenId(tokenId);
    await approve();
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
