/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAccount } from "wagmi";
import { ListItem, NFTItem } from "../utils/contractUtils";
import { useMemo } from "react";
import { useAsyncFn } from "react-use";
import { toast } from "react-toastify";
import {
  readContract,
  waitForTransactionReceipt,
  writeContract,
} from "wagmi/actions";
import { wagmiConfig } from "../main";
import { contractInfo } from "../utils/const";
import { useFTBalance } from "../utils/hooks/useFTBalance";

interface ItemCardProps {
  data: NFTItem | ListItem;
  from: "profile" | "card list";
  showListModal?: () => void;
  refreshData?: () => void;
}

export function ItemCard(props: ItemCardProps) {
  const { data, from, showListModal, refreshData } = props;
  const { balance, refreshBalance } = useFTBalance();

  const { address } = useAccount();
  const isMyItem = useMemo(() => {
    if (from === "profile") {
      return true;
    } else {
      return (data as any).seller === address;
    }
  }, [address, data, from]);
  const isOnSale = useMemo(() => {
    if (from === "profile") {
      return (data as any).seller === address;
    } else {
      return true;
    }
  }, [address, data, from]);

  const [buyResult, handleBuy] = useAsyncFn(async () => {
    const listItem = data as ListItem;
    try {
      const allowance = await readContract(wagmiConfig, {
        address: contractInfo.Erc20Token.address,
        abi: contractInfo.Erc20Token.abi,
        functionName: "allowance",
        args: [address!, contractInfo.Market.address],
      });
      console.log(allowance);
      const listPrice = listItem.price * 1e18;
      if (Number(allowance) < listPrice) {
        // 批准代币授权
        const approvalTx = await writeContract(wagmiConfig, {
          address: contractInfo.Erc20Token.address,
          abi: contractInfo.Erc20Token.abi,
          functionName: "approve",
          args: [contractInfo.Market.address, BigInt(Number(balance) * 1e18)],
        });
        await waitForTransactionReceipt(wagmiConfig, {
          hash: approvalTx,
        });
      }

      const buyTx = await writeContract(wagmiConfig, {
        address: contractInfo.Market.address,
        abi: contractInfo.Market.abi,
        functionName: "purchaseNFT",
        args: [BigInt(listItem.listId)],
      });

      await waitForTransactionReceipt(wagmiConfig, {
        hash: buyTx,
      });
      toast.success("Buy succeed!");
      refreshData && refreshData();
      refreshBalance();
    } catch (e) {
      console.error(e);
      toast.error(`Failed to buy! ${JSON.stringify(e)}`);
    }
  }, [data, address, balance, refreshBalance]);

  const buttonText = useMemo(() => {
    if (!address) return "";
    if (buyResult.loading) {
      return "Loading";
    }
    if (isMyItem) {
      return isOnSale ? "" : "List";
    } else {
      return isOnSale ? "Buy" : "";
    }
  }, [address, buyResult.loading, isMyItem, isOnSale]);

  return (
    <div className="rounded-lg relative overflow-hidden group w-[calc(100vw_-_32px)] sm:w-[260px] duration-200 cursor-pointer shadow-lg hover:shadow-xl">
      {isOnSale && (
        <div className="absolute right-1 top-1 bg-green-500 text-white text-sm p-1 rounded-sm z-10">
          Listed with {(data as any).price} HT
        </div>
      )}
      <div className="w-full aspect-square overflow-hidden">
        <div
          className="w-full h-full bg-center bg-cover group-hover:scale-110 duration-300"
          style={{
            backgroundImage: `url('${data.image}')`,
          }}
        ></div>
      </div>

      <div className="p-2">
        <div className="flex justify-between items-center gap-x-4 text-lg font-bold">
          <span className="flex-1 line-clamp-1">{data.name}</span>
          <span>#{data.id}</span>
        </div>
        <p className="italic text-sm mt-1 line-clamp-2 h-10">
          {data.description}
        </p>
      </div>
      {buttonText && (
        <button
          className="w-full duration-200 hover:opacity-75 bg-primaryColor text-center text-white py-2"
          onClick={() => {
            if (isMyItem) {
              if (isOnSale) {
                return;
              } else {
                console.log("do list");
                showListModal && showListModal();
              }
            } else {
              if (isOnSale) {
                handleBuy();
              } else {
                return;
              }
            }
          }}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}
