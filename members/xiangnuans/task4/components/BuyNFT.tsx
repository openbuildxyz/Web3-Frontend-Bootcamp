import { NFT } from "./NFTList";
import erc20Abi from "../utils/erc20Abi.json";
import { ethers } from "ethers";
import nftMarketAbi from "../utils/nftMarketAbi.json";
import { useSigner } from "wagmi";

const NFTMarketAddress = "0xYourNFTMarketContractAddress";

interface BuyNFTProps {
  nft: NFT;
}

export default function BuyNFT({ nft }: BuyNFTProps) {
  const { data: signer } = useSigner();

  const buyNFT = async () => {
    if (signer) {
      const erc20Contract = new ethers.Contract(
        nft.tokenAddress,
        erc20Abi,
        signer
      );
      const allowance = await erc20Contract.allowance(
        signer.getAddress(),
        NFTMarketAddress
      );
      const price = nft.price;

      if (allowance.lt(price)) {
        const approveTx = await erc20Contract.approve(NFTMarketAddress, price);
        await approveTx.wait();
      }

      const nftMarketContract = new ethers.Contract(
        NFTMarketAddress,
        nftMarketAbi,
        signer
      );
      const tx = await nftMarketContract.buyNFT(
        nft.nftAddress,
        nft.tokenId,
        price
      );
      await tx.wait();
      alert("NFT bought successfully!");
    }
  };

  return (
    <button
      className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
      onClick={buyNFT}
    >
      Buy NFT
    </button>
  );
}
