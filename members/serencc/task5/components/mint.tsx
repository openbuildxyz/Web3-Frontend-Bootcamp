"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useWriteContract } from "wagmi"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useMintModal } from "@/store/use-mint-modal"
import { MintSchema } from "@/lib/schemas"

import { MyNFTABI } from "@/lib/abis"
import { MyNFTAddress } from "@/lib/constants"

type Props = {
  isConnected: boolean
}

export const Mint = ({ isConnected }: Props) => {
  const { isOpen, onOpen, onClose } = useMintModal()

  const isModalOpen = isOpen && isConnected

  const handleMint = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet")
    }
    onOpen()
  }

  const { writeContractAsync } = useWriteContract()

  const form = useForm<z.infer<typeof MintSchema>>({
    resolver: zodResolver(MintSchema),
    defaultValues: {
      address: "",
      uri: "",
    },
  })

  const handleClose = () => {
    form.reset()
    onClose()
  }

  const onSubmit = async (values: z.infer<typeof MintSchema>) => {
    try {
      await writeContractAsync({
        abi: MyNFTABI,
        address: MyNFTAddress,
        functionName: "mint",
        args: [values.address as `0x${string}`, values.uri],
      }).then((res) => {
        console.log(res)
        toast.success("NFT minted successfully")
        handleClose()
      })
    } catch (error) {
      console.log(error)
      toast.error("Error minting NFT")
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <Button
        disabled={!isConnected}
        variant="secondary"
        size="sm"
        className="w-20"
        onClick={handleMint}
      >
        Mint
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Mint NFT</DialogTitle>
          <DialogDescription>
            Make sure the information is correct before minting.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="gap-4">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter the owner's address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="uri"
              render={({ field }) => (
                <FormItem className="gap-4">
                  <FormLabel>URI</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter the NFT's uri"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" size="lg">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
