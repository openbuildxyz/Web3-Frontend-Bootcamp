"use client"

import { useState } from "react"
import { useWriteContract } from "wagmi"
import { parseUnits } from "viem"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Copy, Check } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Label } from "@/components/ui/label"

import { ListNFTSchema } from "@/lib/schemas"
import { useListModal } from "@/store/use-list-modal"
import { MyNFTAddress, NFTMarketAddress } from "@/lib/constants"
import { MyNFTABI, NFTMarketABI } from "@/lib/abis"

type Props = {
  isConnected: boolean
}
export const ListNFT = ({ isConnected }: Props) => {
  const { isOpen, onOpen, onClose } = useListModal()
  const [copied, setCopied] = useState(false)
  const { writeContractAsync } = useWriteContract()

  const isModalOpen = isOpen && isConnected

  const handleList = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet")
    }
    onOpen()
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  const form = useForm<z.infer<typeof ListNFTSchema>>({
    resolver: zodResolver(ListNFTSchema),
    defaultValues: {
      tokenid: 0,
      price: 0,
    },
  })

  const onCopy = () => {
    navigator.clipboard.writeText(NFTMarketAddress)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  const onSubmit = async (values: z.infer<typeof ListNFTSchema>) => {
    writeContractAsync({
      abi: MyNFTABI,
      address: MyNFTAddress,
      functionName: "setApprovalForAll",
      args: [NFTMarketAddress, true],
    })
      .then((res) => {
        console.log("Approval success", res)
        writeContractAsync({
          abi: NFTMarketABI,
          address: NFTMarketAddress,
          functionName: "listNFT",
          args: [
            MyNFTAddress,
            BigInt(values.tokenid),
            parseUnits(`${values.price}`, 3),
          ],
        })
          .then((res) => {
            console.log("ListNFT success", res)
            toast.success("NFT listed")
            handleClose()
          })
          .catch((error) => {
            console.log("ListNFT failed", error)
          })
      })
      .catch((error) => {
        console.log("Approval failed", error)
      })
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <Button
        disabled={!isConnected}
        variant="secondary"
        size="sm"
        onClick={handleList}
        className="w-20"
      >
        List NFT
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>List NFT</DialogTitle>
          <DialogDescription>
            Make sure the information is correct before submitting.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="hash">Contract</Label>
            <div className="flex items-center justify-between gap-2">
              <Input id="hash" defaultValue={NFTMarketAddress} readOnly />
              <Button onClick={onCopy} size="sm" className="px-3">
                <span className="sr-only">Copy</span>
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="tokenid"
              render={({ field }) => (
                <FormItem className="gap-4">
                  <FormLabel>Token ID</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Token ID"
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
              render={({ field }) => (
                <FormItem className="gap-4">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter Price" {...field} />
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
