import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { FormEvent } from "react";
import { nftMarketContractConfig } from "@/config/nftMarketContractConfig";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { nftContractConfig } from "@/config/nftContractConfig";
import { tokenContractConfig } from "@/config/tokenContractConfig";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { DateFormatter } from "@internationalized/date";

export default function NftMarketContract() {
  return (
    <div>
      <List />
      <ListNft />
    </div>
  );
}

function List() {
  const { data: hash, error, writeContract } = useWriteContract();

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
  listTime: bigint;
}

function ApproveOrPurchase({
  tokenId,
  price,
}: {
  tokenId: bigint;
  price: bigint;
}) {
  const { address } = useAccount();

  const { data: allowance } = useReadContract({
    ...tokenContractConfig,
    functionName: "allowance",
    args: [address || `0x${address}`, nftMarketContractConfig.address],
  });

  const { data, isPending, error, writeContract } = useWriteContract();

  if (error) {
    return <div>something is wrong: {error.message}</div>;
  }

  if (!allowance || BigInt(allowance.toString()) < price) {
    return (
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        onClick={async () => {
          writeContract({
            ...tokenContractConfig,
            functionName: "approve",
            args: [nftMarketContractConfig.address, price],
          });
        }}
      >
        {isPending ? "approving" : "approve"}
      </button>
    );
  } else {
    return (
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          onClick={async () => {
            writeContract({
              ...nftMarketContractConfig,
              functionName: "purchase",
              args: [nftContractConfig.address, tokenId],
            });
          }}
        >
          {isPending ? "purchasing" : "purchased"}
        </button>
      </div>
    );
  }
}

function ListNft() {
  const { data: itemList, error } = useReadContract({
    ...nftMarketContractConfig,
    functionName: "getAllListNft",
    args: [nftContractConfig.address],
  });

  console.log("nft", itemList);

  if (error) {
    return <div>something is wrong: {error.message}</div>;
  }

  return (
    <div className="w-1/3">
      <Listbox items={itemList || []} aria-label="Dynamic Actions">
        {(item) => (
          <ListboxItem
            key={item.tokenId.toString()}
            textValue={item.tokenId.toString()}
          >
            <div className="flex flex-col border-2 border-gray-200">
              <div>owner: {item.owner}</div>
              <div>price: {item.price.toString()}</div>
              <div>tokenId: {item.tokenId.toString()}</div>
              <div>
                listTime: {new Date(Number(item.listTime) * 1000).toLocaleString()}
              </div>
              <ApproveOrPurchase price={item.price} tokenId={item.tokenId} />
            </div>
          </ListboxItem>
        )}
      </Listbox>
    </div>
  );
}
