import React, { useEffect, useState, useRef } from "react";
import { useAccount, useConnect, useDisconnect, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ethers } from "ethers";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";

import Modal from "@mui/material/Modal";

import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import List from "@mui/material/List";
import { ERC721ABI } from "../../ABI/ERC721";
import { NFTMarketABI } from "../../ABI/market";
import { marketPlaceAddress, nftContractAddress, nftOwner } from "../../utils";

export default function NFTList() {
  const [open, setOpen] = React.useState(false);
  const selectedItem = useRef<any>({});
  const { data: hash, isPending, writeContract } = useWriteContract();

  const handleClickOpen = (item: any) => {
    setOpen(true);
    selectedItem.current = item;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    const { tokenId, address } = selectedItem.current;
    const field = document.getElementById("price-field");

    if (field.value.trim() === "") return;

    writeContract({
      address: marketPlaceAddress,
      abi: NFTMarketABI,
      functionName: "listNFT",
      args: [address, tokenId.toString(), ethers.parseEther(field.value)],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isConfirming) {
      setOpen(false);
    }
  }, [isConfirming, isConfirmed]);

  const unlistingResponse = useReadContract({
    abi: ERC721ABI,
    functionName: "getAllTokenIds",
    address: nftContractAddress,
  });

  const unlistingNFTs = (unlistingResponse.data || []).map((tokenId: string) => {
    return { tokenId, owner: nftOwner, address: nftContractAddress };
  });

  return (
    <>
      <div className="list">
        {unlistingNFTs.map((item: any) => (
          <Card sx={{ maxWidth: 445 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Token ID: {item.tokenId.toString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Owner: {item.owner}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" onClick={() => handleClickOpen(item)}>
                上架
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>

      <Dialog open={open} onClose={handleClose} aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{"设置上架的价格"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField required id="price-field" placeholder="请输入价格" defaultValue="0.1" variant="standard" />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={handleClose}>
            取消
          </Button>
          <LoadingButton size="small" onClick={handleConfirm}>
            确定
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
