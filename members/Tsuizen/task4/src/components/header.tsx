import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWriteContract } from 'wagmi';
import { ZenNFT } from '@/abis/ZenNFT';
import { ZEN_NFT_ADDRESS } from '@/constants';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import { useToast } from './ui/use-toast';
import { Button } from './ui/button';
import NFTForm from './nft-form';

export default function Header() {
  const account = useAccount();
  const { writeContractAsync } = useWriteContract();

  const { toast } = useToast();

  const handleMint = async () => {
    try {
      await writeContractAsync({
        abi: ZenNFT,
        address: ZEN_NFT_ADDRESS,
        functionName: 'mint',
        args: [account.address]
      });
      toast({
        title: 'Mint',
        description: 'success'
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='w-screen h-20 bg-slate-200 flex items-center p-10 justify-between'>
      <div>
        <span className='text-2xl'>NFTMarket</span>
        <Button className='ml-5 h-8' onClick={handleMint}>
          Mint
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button className='ml-5 h-8'>NFTList</Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>List NFT</DialogTitle>
              <DialogDescription>Sell your nft to market</DialogDescription>
            </DialogHeader>
            <NFTForm />
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <ConnectButton />
      </div>
    </div>
  );
}
