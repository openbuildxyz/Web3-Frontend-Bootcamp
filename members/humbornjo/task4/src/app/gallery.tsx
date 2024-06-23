'use client';
import { market_abi } from "@/abi/market";
import { useAccount, useContractRead } from "wagmi";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Image from "next/image";

interface NftMeta {
  owner: string
  contract: string
  tokenId: bigint
  price: bigint
  tokenUrl?: string
}

const marketContract = "0x052787812071683E8221faC52143a9DCbB1351d8"
const field = "gallery";
// const account = useAccount()

export const Gallery = () => {
  const { data, error, isLoading } = useContractRead({
    address: marketContract,
    abi: market_abi,
    functionName: field,
    args: [BigInt(1)],
  });

  const parseData = (data: unknown): NftMeta | null => {
    if (Array.isArray(data)) {
      if (
        typeof data[0] === 'string' &&
        typeof data[1] === 'string' &&
        typeof data[2] === 'bigint' &&
        typeof data[3] === 'bigint'
      ) {
        return {
          owner: data[0],
          contract: data[1],
          tokenId: data[2],
          price: data[3],
          tokenUrl: "",
        }
      }
    }
    return null
  }

  const nfts: NftMeta[] = [];

  const item = parseData(data)
  if (item !== null) {
    nfts.push(item)
    nfts.push(item)
  }
  console.log(data)

  const exhibition = nfts.map((item) => <Item {...item} />)

  return (
    <>
      <p className="font-mono self-center text-6xl py-10">Ga113r9</p >
      <div className="flex justify-around self-center w-4/6 min-w-500 m-4">
        {exhibition}
      </div>
    </>
  )
}

export function Item(metadata: NftMeta) {
  const truncate = (address: string) => address.slice(0, 7) + '...';

  const handleBuy = () => {
    const erc20Config = usePrepareContractWrite({
      address: '0xYourERC20TokenAddress',
      abi: ,
      functionName: 'approve',
      args: ['0xSpenderAddress', ethers.utils.parseUnits(amount, 18)],
    });
  }

  return (
    <div className="flex flex-col items-start rounded-lg border border-gray-300 p-4 bg-white shadow-lg max-w-md">
      <div className="flex items-start space-x-4">
        <Image
          src={metadata.tokenUrl || "/mesh.png"}
          alt="NFT Image"
          className="rounded-lg object-cover"
          width={100}
          height={100}
          priority
        />
        <div className="flex flex-col text-sm p-2">
          <div className="relative group mb-0">
            <span className="font-mono text-gray-700">{"Owner   "}</span>
            <span
              className="mb-2 font-symbolic text-gray-900 truncate cursor-pointer"
              title={metadata.owner}
            >
              {truncate(metadata.owner)}
            </span>
            <CopyToClipboard text={metadata.owner}>
              <button className="ml-1 text-blue-500 hover:underline">Copy</button>
            </CopyToClipboard>
            <div className="absolute hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 z-10">
              {metadata.owner}
            </div>
          </div>

          <div className="relative group my-0">
            <span className="font-mono text-gray-700">Contract </span>
            <span
              className="mb-2 text-gray-900 truncate cursor-pointer"
              title={metadata.contract}
            >
              {truncate(metadata.contract)}
            </span>
            <CopyToClipboard text={metadata.contract}>
              <button className="ml-1 text-blue-500 hover:underline">Copy</button>
            </CopyToClipboard>
            <div className="absolute hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 z-10">
              {metadata.contract}
            </div>
          </div>
          <div className="relative group my-0">
            <span className="font-mono text-gray-700">TokenID </span>
            <span className="mb-2 text-gray-900">{Number(metadata.tokenId)}</span>
          </div>
          <div className="relative group my-0">
            <span className="font-mono text-gray-700">Price </span>
            <span className="text-gray-900">{Number(metadata.price)}</span>
          </div>
          <button
            type="button"
            className="mt-2 bg-black text-white font-mono px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2"
            onClick={handleBuy}
          >
            BUY
          </button>
        </div>
      </div>
    </div>
  );
}

