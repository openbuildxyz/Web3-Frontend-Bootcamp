import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { BuyNFT } from "./buy-nft";
import { ListingNFT } from "@/utils/fetchListings";
import { DelistNFT } from "./delist-nft";
import { useAccount } from "wagmi";

interface NFTCardProps {
  nft: ListingNFT;
  onBuyNFT: (id: string) => void;
  onDelist: (id: string) => void;
}

export function NFTCard({ nft, onBuyNFT, onDelist }: NFTCardProps) {
  const { address } = useAccount();
  const isOwner = address?.toLowerCase() === nft.seller.toLowerCase();

  return (
    <Card className="w-[300px] max-w-sm">
      <CardHeader>
        <CardTitle>{nft.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[255px]">
          <Image
            src={nft.image || "/placeholder.svg"}
            alt={nft.name}
            width={300}
            height={300}
            className="w-[250px] h-auto rounded-lg"
            unoptimized
          />
        </div>
        <p className="mt-2 text-sm text-gray-600">{nft.name}</p>
        <p className="mt-2 font-bold">Price: {nft.price} MTK</p>
        <p className="text-sm text-gray-600">
          Contract: {nft.nftContract.slice(0, 6)}...{nft.nftContract.slice(-4)}
        </p>
        <p className="text-sm text-gray-600">Token ID: {nft.tokenId}</p>
        <p className="text-sm text-gray-600">
          Seller: {nft.seller.slice(0, 6)}...{nft.seller.slice(-4)}
        </p>
      </CardContent>
      <CardFooter>
        {isOwner ? (
          <DelistNFT nft={nft} onDelist={onDelist} />
        ) : (
          <BuyNFT nft={nft} onBuyNFT={onBuyNFT} />
        )}
      </CardFooter>
    </Card>
  );
}
