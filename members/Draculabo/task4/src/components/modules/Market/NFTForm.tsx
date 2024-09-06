import { DialogDescription } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  NFTMARKET_ADDR,
  MYTOKEN_ADDR,
} from '@/abis/address';
import { useWriteContract } from 'wagmi';
import { parseUnits } from 'viem';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import MyToken from '@/abis/MyToken';
import NFTMarket from '@/abis/NFTMarket';

const formSchema = z.object({
  tokenId: z.string().min(1).max(50),
  price: z.string().min(1),
});
interface NFTFormProps {
  closeDialog: () => void;
}
const NFTForm = ({ closeDialog }: NFTFormProps) => {
  const { toast } = useToast();
  const { writeContractAsync } = useWriteContract();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { tokenId, price } = values;
    if (price === '' || tokenId  === '') {
      toast({
        variant: 'destructive',
        description: 'Please input token id and price.',
      });
      return;
    }
    if (price <= '0') {
      toast({
        variant: 'destructive',
        description: 'Price cannot be less than 0.',
      });
      return;
    }
    try {
      setLoading(true);
      await writeContractAsync({
        abi: MyToken,
        address: MYTOKEN_ADDR,
        functionName: 'setApprovalForAll',
        args: [NFTMARKET_ADDR, true],
      });
      await writeContractAsync({
        abi: NFTMarket,
        address: NFTMARKET_ADDR,
        functionName: 'listGrantedNFT',
        args: [MYTOKEN_ADDR, BigInt(tokenId), parseUnits(`${price}`, 6)],
      });
      closeDialog();
      toast({
        variant: 'success',
        description:
          "sell success ~ ! please refresh the page to see the changes later.'",
      });
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogDescription>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="tokenId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>tokenId</FormLabel>
                <FormControl>
                  <Input placeholder="input tokenId" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>price</FormLabel>
                <FormControl>
                  <Input placeholder="input price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" loading={loading}>
            Submit
          </Button>
        </form>
      </Form>
    </DialogDescription>
  );
};
export default NFTForm;
