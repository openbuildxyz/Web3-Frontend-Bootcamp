import * as React from "react";
import { ethers, formatEther, formatUnits } from "ethers";
import { type BaseError, useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { NFTMarketABI } from "../../ABI/market";
import { ERC20ABI } from "../../ABI/ERC20";

import { marketPlaceAddress, tokenContractAddress, tokenOwner } from "../../utils";

interface NFT {
  nftContract: string;
  price: string;
  seller: string;
  tokenId: string | number;
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

  console.log(error, "--err");

  return (
    <Card sx={{ maxWidth: 445 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Token ID: {info.tokenId.toString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Address: {info.nftContract}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Seller: {info.seller}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {ethers.formatEther(info.price)}BIRD
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="secondary" disabled={isConfirming} onClick={handleClickBuyNFT}>
          {isConfirming ? "Confirming..." : "购买"}
        </Button>
      </CardActions>
    </Card>
  );
}
