import { useAccount, useWriteContract } from "wagmi";
import "./style.css";
import dayjs from "dayjs";
import { message } from "antd";
import { nftAddress, marketAddress, YZQAddress } from "@/utils/contractAddress";
import { MarketABI, NFTABI, TokenABI } from "@/abi";
import Button from "../Button";
import { LoadingOutlined } from "@ant-design/icons";
import { formatEther } from "viem";
type AddressHash = `0x${string}`;
type NftItem = {
  seller: AddressHash;
  nftContract: AddressHash;
  tokenId: number;
  tokenUrl: string;
  price: bigint;
  listedAt: bigint;
  listing: boolean;
};
export default function Card(props: any) {
  const { nftItem, btnName, buyNft, isLoading } = props;

  return (
    <div className="rounded-xl overflow-hidden shadow-lg p-2">
      <div className="mb-2">
        <img src={nftItem.tokenUrl} alt="" />
      </div>
      <div>
        <span>{nftItem.price}</span>
        <p className="cardOverflow">Token ID： {nftItem.tokenId + ""}</p>
        <p className="cardOverflow">Contract： {nftItem.nftContract}</p>
        <p className="cardOverflow">Seller： {nftItem.seller}</p>
        <p className="cardOverflow">price： {formatEther(nftItem.price)} YZQ</p>
        <p className="cardOverflow">
          Listing Time：
          {dayjs(Number(nftItem.listedAt) * 1000).format("YYYY-MM-DD HH:mm:ss")}
        </p>
      </div>
      <div
        onClick={() => buyNft(nftItem)}
        className="w-10/12 rounded-xl bg-black text-white font-bold flex justify-center items-center p-2 m-auto mt-2 cursor-pointer"
      >
        <div
          style={{ display: isLoading ? "inline" : "none" }}
          className="mr-2"
        >
          <LoadingOutlined />
        </div>
        <span>{btnName}</span>
      </div>
    </div>
  );
}
