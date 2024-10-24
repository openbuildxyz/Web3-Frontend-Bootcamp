import { zodResolver } from '@hookform/resolvers/zod';
import { useWriteContract } from 'wagmi';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { NFTExchange } from '@/abis/NFTExchange';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { NFT_MARKET_ADDRESS, ZEN_NFT_ADDRESS } from '@/constants';
import { ZenNFT } from '@/abis/ZenNFT';

const formSchema = z.object({
  tokenUrl: z.string(),
  tokenId: z.string(),
  price: z.string()
});

export default function NFTForm() {
  const { writeContractAsync } = useWriteContract();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { tokenUrl, price, tokenId } = values;
    
    try {
      await writeContractAsync({
        abi: ZenNFT,
        address: ZEN_NFT_ADDRESS,
        functionName: 'setApprovalForAll',
        args: [NFT_MARKET_ADDRESS, true]
      })

      await writeContractAsync({
        abi: NFTExchange,
        address: NFT_MARKET_ADDRESS,
        functionName: 'listNFT',
        args: [ZEN_NFT_ADDRESS, parseInt(tokenId), parseInt(price) * 1000000, tokenUrl]
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
      <FormField
          control={form.control}
          name='tokenId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Token ID</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='tokenUrl'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Token URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input {...field} type='number'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}
