import { useWatchContractEvent, useWriteContract } from "wagmi";
import { FormEvent, useEffect, useState } from "react";
import { nftMarketContractConfig } from "@/config/nftMarketContractConfig";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { nftContractConfig } from "@/config/nftContractConfig";
import { tokenContractConfig } from "@/config/tokenContractConfig";
import { ethers } from "ethers";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { readContract } from "@wagmi/core";
import { config } from "@/config/config";

export default function NftMarketContract() {
  return (
    <div>
      <List />
      <ListNft />
      {/*<Purchase />*/}
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

interface Order {
  address: string;
  price: bigint;
  tokenId: bigint;
}

function ListNft() {
  const { data, writeContract } = useWriteContract();

  const [tokenId, setTokenId] = useState<bigint>();

  const [orderList, setOrderList] = useState<Order[]>([]);

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

  useEffect(() => {
    const fetchOrderList = async () => {
      let result = [];
      let i = BigInt("0");
      for (; i < BigInt("10"); i++) {
        const data = await readContract(config, {
          ...nftMarketContractConfig,
          functionName: "orderList",
          args: [nftContractConfig.address, i],
        });
        if (data && data[1] != BigInt("0")) {
          let [address, price] = data;
          let order: Order = {
            address,
            price,
            tokenId: i,
          };
          result.push(order);
        }
      }
      setOrderList(result);
    };
    fetchOrderList().then(() => {});
  }, []);

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

  return (
    <div className="w-1/3">
      <Listbox
        items={orderList}
        aria-label="Dynamic Actions"
        onAction={(key) => {
          setTokenId(BigInt(key));
          approve().catch((error) => console.log(error));
        }}
      >
        {(item) => (
          <ListboxItem key={item.tokenId.toString()}>
            <div className="flex flex-col border-2 border-gray-200">
              <p>owner: {item.address}</p>
              <p>price: {item.price.toString()}</p>
              <p>tokenId: {item.tokenId.toString()}</p>
            </div>
          </ListboxItem>
        )}
      </Listbox>
    </div>
  );
}