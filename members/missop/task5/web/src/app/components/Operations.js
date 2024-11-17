import { useWrite } from "@/hooks/contract";
import { waitForTransactionReceipt } from "@wagmi/core";
import React, { useState } from "react";
import config from "../wagmi";

export default function Operations() {
  const { mintNFT, setApprovalForAll, listNFT } = useWrite();
  const [tokenId, setTokenId] = useState("");
  const [price, setPrice] = useState("");
  const [cid, setCid] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <div>
        <button
          onClick={async () => {
            const mintHash = await mintNFT();
            if (mintHash) {
              console.log("mintHash processing......");
              await waitForTransactionReceipt(config, {
                hash: mintHash,
              });
              alert("mintHash success......");
            }
          }}
          className="bg-blue-500 text-white w-full  px-4 py-2 rounded-md mt-4"
        >
          铸造NFT
        </button>
      </div>
      <div>
        <label for="price" className="block text-sm font-medium leading-6 ">
          上架的 NFT ID：
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            value={tokenId}
            type="text"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(e) => {
              setTokenId(e.target.value);
            }}
          />
        </div>
      </div>
      <div>
        <label for="price" className="block text-sm font-medium leading-6 ">
          上架价格：
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            value={price}
            type="text"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
      </div>
      <div>
        <label for="price" className="block text-sm font-medium leading-6 ">
          cid：
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            value={cid}
            type="text"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(e) => {
              setCid(e.target.value);
            }}
          />
        </div>
      </div>
      <div>
        <button
          className="bg-blue-500 text-white w-full  px-4 py-2 rounded-md mt-4"
          onClick={async () => {
            if (!tokenId) {
              alert("请输入需要上架的 NFT ID");
            } else if (!price) {
              alert("请输入上架价格");
            } else if (!cid) {
              alert("请输入 cid");
            } else {
              const approvalHash = await setApprovalForAll();
              if (approvalHash) {
                await waitForTransactionReceipt(config, {
                  hash: approvalHash,
                });
              }
              const listHash = await listNFT(tokenId, price, cid);
              if (listHash) {
                await waitForTransactionReceipt(config, {
                  hash: listHash,
                });
                alert("上架成功");
                setTokenId("");
                setPrice("");
                setCid("");
              }
            }
          }}
        >
          上架
        </button>
      </div>
    </div>
  );
}
