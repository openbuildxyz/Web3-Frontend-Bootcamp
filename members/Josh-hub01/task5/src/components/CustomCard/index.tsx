import * as React from "react";
import { ethers, formatEther, formatUnits } from "ethers";
import { type BaseError, useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import NFTMarketABI from "../../ABI/market";
import { ERC20ABI } from "../../ABI/ERC20";
import ERC721_ABI from "../../ABI/ERC721.json";

import { marketPlaceAddress, tokenContractAddress, tokenOwner, nftContractAddress } from "../../utils";

interface NFT {
  nftContract: string;
  price: string;
  seller: string;
  tokenId: string | number;
  listTimestamp: string;
}

export default function ImgMediaCard(props: any) {
  const info: NFT = props.info;
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const readTokenResponse = useReadContract({
    abi: ERC20ABI,
    functionName: "allowance",
    address: tokenContractAddress,
    args: [tokenOwner, marketPlaceAddress],
  });

  const handleClickBuyNFT = () => {
    const allowance = ethers.formatEther(readTokenResponse.data);

    if (readTokenResponse.data < info.price) {
      writeContract({
        address: tokenContractAddress,
        abi: ERC20ABI,
        functionName: "approve",
        args: [marketPlaceAddress, info.price],
      });
      return;
    }

    writeContract({
      address: marketPlaceAddress,
      abi: NFTMarketABI,
      functionName: "buyNFT",
      args: [info.nftContract, info.tokenId.toString()],
    });
  };

  const contractNFT = useReadContract({
    abi: ERC721_ABI,
    functionName: "tokenURI",
    address: nftContractAddress,
    args: [info.tokenId],
  });

  const handleRemove = () => {
    writeContract({
      address: marketPlaceAddress,
      abi: NFTMarketABI,
      functionName: "removeNFT",
      args: [info.nftContract, info.tokenId.toString()],
    });
  };

  return (
    <Card sx={{ maxWidth: 445 }}>
      <CardMedia sx={{ height: 140 }} image={contractNFT.data} title="NFT" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          价格：{ethers.formatEther(info.price)} BIRD
        </Typography>
        <Typography variant="body2" color="text.secondary">
          拥有者：{info.seller}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          上架时间：{Date(info.listTimestamp.toString())}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Token ID: {info.tokenId.toString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="success" disabled={isConfirming} onClick={handleClickBuyNFT}>
          购买
        </Button>
        <Button variant="contained" color="secondary" onClick={handleRemove}>
          下架
        </Button>
      </CardActions>
    </Card>
  );
}
