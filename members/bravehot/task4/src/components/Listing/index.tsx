"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BaseError,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { abi } from "@/abi/NFTMarket";
import { isEmpty } from "lodash-es";

const formSchema = z.object({
  nftContract: z.string().min(42, {
    message: "Please input NFT contract address",
  }),
  tokenId: z.string().min(1, {
    message: "Please input Token Id",
  }),
  price: z.string().min(1, {
    message: "Please input price",
  }),
});

const Listing: React.FC = () => {
  const [openStatus, setOpenStatus] = useState(false);

  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema as any),
  });

  const onSubmit = (val: any) => {
    const { nftContract, tokenId, price } = val;
    writeContract({
      address: process.env.NEXT_PUBLIC_MARKET_ADDRESS as any,
      abi,
      functionName: "listNFT",
      args: [nftContract, tokenId, price],
    });
  };

  useEffect(() => {
    setOpenStatus(false);
  }, [isConfirmed]);

  return (
    <Dialog
      defaultOpen={false}
      open={openStatus}
      onOpenChange={(status: boolean) => {
        setOpenStatus(status);
        form.reset();
      }}
    >
      <DialogTrigger>
        <Button>Put on Sale</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Put on Sale</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="nftContract"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>NFT Contract</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please input NFT contract address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input placeholder="Please input price" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tokenId"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Token Id</FormLabel>
                      <FormControl>
                        <Input placeholder="Please input Token Id" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {error && (
                  <FormDescription>
                    Error: {(error as BaseError).shortMessage || error.message}
                  </FormDescription>
                )}

                <Button
                  type="submit"
                  disabled={isPending || isConfirming || isConfirmed}
                >
                  Submit
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Listing;
