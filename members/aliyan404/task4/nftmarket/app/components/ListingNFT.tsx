import React, { useEffect, useState } from 'react'
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
import { useReadContract, useWriteContract } from 'wagmi'
import { ERC20ABI, ERC721ABI, NFTEXABI } from '../utils/abi'
import {
  OBTContractAddr,
  WFTContractAddr,
  NFTEXContractAddr,
} from '../utils/contractAddr'
import { useIsApproveAll } from '../utils/readContracts'
import { useApproveAll, useListNFT } from '../utils/writeContracts'

export default function ListingNFT({ address }: { address: any }) {
  const [contractAddr, setcontractAddr] = useState<any>('')
  const [tokenId, settokenId] = useState<bigint>(BigInt(0))
  const [price, setprice] = useState<bigint>(BigInt(0))

  const approveAll = useApproveAll()
  const listingNFT = useListNFT()

  let isApproved = useIsApproveAll(address, NFTEXContractAddr)

  const handleListing = (e: any) => {
    e.preventDefault()
    // 授权
    console.log('isApproved(1):', isApproved)
    if (!isApproved) {
      approveAll()
      isApproved = true
      console.log('isApproved(2):', isApproved)
    }

    // 上架
    console.log('tokenId:', tokenId)
    console.log('price:', price)
    if (!tokenId || !price) return
    listingNFT(tokenId, price)
    console.log('上架成功')
  }

  return (
    <div className="bg-gray-300 flex gap-4 border-collapse border-2 border-gray-300 p-4 rounded-lg shadow-md">
      <div className="pt-2">上架你的NFT</div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">上架NFT</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form
            onSubmit={(e) => {
              handleListing(e)
            }}
          >
            <DialogHeader>
              <DialogTitle>输入你要上架的NFT</DialogTitle>
              <DialogDescription>
                请输入NFT合约地址、TokenId、以及你想出售的价格
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
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  出售价格
                </Label>
                <Input
                  id="price"
                  defaultValue=""
                  className="col-span-3"
                  onChange={(e) => {
                    setprice(BigInt(e.target.value))
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">确认上架</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
