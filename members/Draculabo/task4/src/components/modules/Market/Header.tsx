'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWriteContract } from 'wagmi';
import { MYTOKEN_ADDR, getNftFuncVars } from '@/abis/contract';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import NFTForm from './NFTForm';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useState } from 'react';

const Header = () => {
  const account = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [open, setOpen] = useState(false);
  const handleMint = async () => {
    if (!account.address) {
      toast({
        description: 'Please connect wallet first.',
      });
      return;
    }
    try {
      await writeContractAsync(getNftFuncVars('mint'));
      toast({
        variant: 'success',
        description: 'mint success',
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <>
      <div className="w-full flex content-end items-center py-2.5 px-2 border border-gray-400 bg-white">
        <Button className="text-gray-400 mr-2" onClick={handleMint}>
          mint
        </Button>
        <Dialog open={open}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setOpen(true);
              }}
              className="text-gray-400"
            >
              listGrantedNFT
            </Button>
          </DialogTrigger>
          <DialogContent className="box-content" clickCloseIcon={() => {
            setOpen(false)
          }}>
            <DialogHeader>
              <DialogTitle>
                <div>
                  <div>listGrantedNFT</div>
                  <div>{`Contract: ${MYTOKEN_ADDR}`}</div>
                </div>
              </DialogTitle>
            </DialogHeader>
            <NFTForm
              closeDialog={() => {
                setOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
        <div className="ml-2.5">
          <ConnectButton label="connect wallet" />
        </div>
      </div>
    </>
  );
};
export default Header;
