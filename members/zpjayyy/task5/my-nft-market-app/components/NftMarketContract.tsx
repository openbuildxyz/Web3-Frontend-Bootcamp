import {useAccount, useReadContract, useWatchContractEvent, useWriteContract} from "wagmi";
import {FormEvent, useEffect, useState} from "react";
import {nftMarketContractConfig} from "@/config/nftMarketContractConfig";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import {nftContractConfig} from "@/config/nftContractConfig";
import {tokenContractConfig} from "@/config/tokenContractConfig";
import Image from "next/image";
import {getWeb3AssetUrl} from "@/utils/urlUtil";
import {readContract} from "@wagmi/core";
import {config} from "@/config/config";

interface Order {
  owner: string;
  price: bigint;
  tokenId: bigint;
  listTime: bigint;
  image: string;
}

export default function NftMarketContract() {
  return (
    <div>
      <List/>
      <ListNft/>
    </div>
  );
}

function List() {
  const {data: hash, error, writeContract} = useWriteContract();

  async function list(tokenId: bigint, price: bigint) {
    writeContract({
      ...nftMarketContractConfig,
      functionName: "list",
      args: [nftContractConfig.address, tokenId, price],
    });
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formDate = new FormData(e.target as HTMLFormElement);
    const tokenId = BigInt(formDate.get("tokenId") as string);
    const price = BigInt(formDate.get("price") as string);
    await list(tokenId, price);
  }

  if (error) {
    return <div>something is wrong: {error.message}</div>;
  }

  return (
    <div className="w-1/3 m-4">
      <form onSubmit={submit}>
        <Input type="number" name="tokenId" placeholder="tokenId" required/>
        <Input type="number" name="price" placeholder="price" required/>
        <Button type="submit">List</Button>
        {hash && <div>transaction hash: {hash}</div>}
      </form>
    </div>
  );
}

function ApproveOrPurchase({
                             tokenId,
                             price,
                             owner
                           }: {
  tokenId: bigint;
  price: bigint;
  owner: string
}) {
  const {address} = useAccount();

  const {data: allowance} = useReadContract({
    ...tokenContractConfig,
    functionName: "allowance",
    args: [address || `0x${address}`, nftMarketContractConfig.address],
  });

  const {isPending, error, writeContract} = useWriteContract();

  if (error) {
    return <div>something is wrong: {error.message}</div>;
  }

  if (!allowance || BigInt(allowance.toString()) < price) {
    return (
      <button
        className="disabled:bg-gray-600 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full "
        disabled={address === owner}
        onClick={() => {
          writeContract({
            ...tokenContractConfig,
            functionName: "approve",
            args: [nftMarketContractConfig.address, price],
          });
        }}
      >
        {isPending ? "approving" : "buy"}
      </button>
    );
  } else {
    return (
      <div>
        <button
          className="disabled:bg-gray-600 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          disabled={address === owner}
          onClick={() => {
            writeContract({
              ...nftMarketContractConfig,
              functionName: "purchase",
              args: [nftContractConfig.address, tokenId],
            });
          }}
        >
          {isPending ? "purchasing" : "buy"}
        </button>
      </div>
    );
  }
}

function ListNft() {
  const {address} = useAccount();
  const [orderList, setOrderList] = useState<Order[]>();

  const {writeContract} = useWriteContract();
  useEffect(() => {
    async function fetchImages() {
      const itemList = await readContract(config, {
        ...nftMarketContractConfig,
        functionName: "getAllListNft",
        args: [nftContractConfig.address],
      })

      const orders: Order[] = new Array<Order>();
      if (itemList) {
        for (let item of itemList) {
          const url = `ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/${item.tokenId}`;
          const response = await fetch(getWeb3AssetUrl(url) || "");
          const data = await response.json();
          const order = {
            owner: item.owner,
            price: item.price,
            tokenId: item.tokenId,
            listTime: item.listTime,
            image: getWeb3AssetUrl(data.image) || "",
          };
          orders.push(order);
        }
        console.log(orders)
        setOrderList(orders);
      }
    }

    fetchImages().catch(error => console.log(error));
  }, []);

  return (
    <div className="flex flex-row flex-wrap">
      {orderList?.map(item => {
        return (
          <div key={item.tokenId} className="flex-1 flex flex-col border-2 border-gray-200 m-2">
            <div>owner: {item.owner}</div>
            <div className="flex flex-row">
              <Image width={200} height={200} src={item.image} alt="image"/>
              <div className="flex flex-col m-4">
                <div>price: {item.price.toString()}</div>
                <div>tokenId: {item.tokenId.toString()}</div>
                <div>
                  listTime: {new Date(Number(item.listTime) * 1000).toLocaleString()}
                </div>
              </div>
            </div>
            <div className="flex flex-row">
              <ApproveOrPurchase price={item.price} tokenId={item.tokenId} owner={item.owner}/>
              <Button disabled={address !== item.owner}
                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full disabled:bg-gray-600 hover:bg-blue-700"
                      onClick={() => {
                        writeContract({
                          ...nftMarketContractConfig,
                          functionName: "cancel",
                          args: [nftContractConfig.address, item.tokenId]
                        })
                      }}>
                cancel
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  );
}
