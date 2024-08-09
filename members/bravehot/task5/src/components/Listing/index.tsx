"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BaseError,
  useAccount,
  useConnect,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { injected } from "wagmi/connectors";

import { Button } from "../ui/buttonServe";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
import { abi as abiNFT } from "@/abi/LouNFT";

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
  const { connect } = useConnect();
  const { isConnected } = useAccount();

  const [openStatus, setOpenStatus] = useState(false);

  const {
    data: approveHash,
    isPending: isApprovePending,
    error: approveError,
    writeContract: writeApproveContract,
  } = useWriteContract();

  const { data: listHash, writeContract: writeListContract } =
    useWriteContract();

  const { isLoading: isApproveLoading, isSuccess: isApproveSuccess } =
    useWaitForTransactionReceipt({
      hash: approveHash,
    });

  const { isSuccess: isListSuccess } = useWaitForTransactionReceipt({
    hash: listHash,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema as any),
  });

  const onSubmit = async (val: any) => {
    if (!isConnected) {
      await connect({ connector: injected() });
    }

    writeApproveContract({
      address: process.env.NEXT_PUBLIC_ERC721_ADDRESS as any,
      abi: abiNFT,
      functionName: "approve",
      args: [process.env.NEXT_PUBLIC_MARKET_ADDRESS as any, val.tokenId],
    });
  };

  const handleListing = async () => {
    const formVal = form.getValues();
    writeListContract({
      address: process.env.NEXT_PUBLIC_MARKET_ADDRESS as any,
      abi,
      functionName: "listNFT",
      args: [formVal.nftContract, formVal.tokenId, formVal.price],
    });
  };

  useEffect(() => {
    if (isApproveSuccess) {
      handleListing();
    }
  }, [isApproveSuccess]);

  useEffect(() => {
    if (isListSuccess) {
      setOpenStatus(false);
    }
  }, [isListSuccess]);
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
        <Button disabled={isApproveLoading}>Put on Sale</Button>
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

                {approveError && (
                  <FormDescription>
                    Error:{" "}
                    {(approveError as BaseError).shortMessage ||
                      approveError.message}
                  </FormDescription>
                )}

                <Button
                  type="submit"
                  disabled={isApprovePending || isApproveLoading}
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
