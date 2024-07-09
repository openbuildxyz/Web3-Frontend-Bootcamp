import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { NFTContractAddr } from '../../utils/contractAddr'
import { marketService } from '@/app/service'

export default function TakeDownNFT({ address }: { address: any }) {
  const [contractAddr, setcontractAddr] = useState<any>('')
  const [tokenId, settokenId] = useState<bigint>(BigInt(0))

  const handleTakeDown = async (e: any) => {
    e.preventDefault()
    try {
      await marketService.takeDownNFT(address, NFTContractAddr, tokenId)
      console.log('下架成功! ')
    } catch (error: any) {
      console.log('下架失败! ', error.message)
    }
  }

  return (
    <div className="bg-gray-300 flex gap-4 border-collapse border-2 border-gray-300 p-4 rounded-lg shadow-md">
      <div className="pt-2">下架你的NFT</div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">下架NFT</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form
            onSubmit={(e) => {
              handleTakeDown(e)
            }}
          >
            <DialogHeader>
              <DialogTitle>请输入你要下架的NFT</DialogTitle>
              <DialogDescription>
                输入想要下架的NFT的合约地址和TokenId
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nftaddr" className="text-right">
                  合约地址
                </Label>
                <Input
                  id="nftaddr"
                  defaultValue=""
                  className="col-span-3"
                  onChange={(e) => {
                    setcontractAddr(e.target.value)
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tokenid" className="text-right">
                  TokenId
                </Label>
                <Input
                  id="tokenid"
                  defaultValue=""
                  className="col-span-3"
                  onChange={(e) => {
                    settokenId(BigInt(e.target.value))
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">确认下架</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
