'use client'
import ListingNFT from './ListingNFT'
import { Button } from '@/components/ui/button'
import NFTItem from './NFTItem'
import { marketService, nftService } from '@/app/service'
import { MarketContractAddr } from '@/app/utils/contractAddr'
import useSWR from 'swr'
import TakeDownNFT from './TakeDownNFT'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { useStorageUpload } from '@thirdweb-dev/react'

export default function NFTForm({ address }: { address: any }) {
  const [file, setFile] = useState<any>()
  const { mutateAsync: upload } = useStorageUpload()
  const uploadToIpfs = async () => {
    try {
      const uploadUrl = await upload({
        data: [file],
        options: {
          uploadWithGatewayUrl: true,
          uploadWithoutDirectory: true,
        },
      })
      return uploadUrl
    } catch (e: any) {
      console.log('mint失败! ', e.message)
    }
  }

  const {
    data,
    error,
    isLoading,
  }: {
    data: any
    error: any
    isLoading: boolean
  } = useSWR(['market-getAllListings'], async () => {
    try {
      const res = await marketService.getAllListings()
      return res
    } catch (e: any) {
      console.log(e.message)
    }
  })

  const { data: isApproved } = useSWR(
    ['isApproved', address, MarketContractAddr],
    async () => {
      return await nftService.isApprovedForAll(address, MarketContractAddr)
    }
  )

  const handleMintNFT = async (e: any) => {
    e.preventDefault()
    try {
      const uri = await uploadToIpfs()
      console.log('uri', uri)
      await nftService.mintNFT(address, uri)
    } catch (error: any) {
      console.log('mintNFT失败！', error.message)
    }
  }

  if (error) return <div>Error</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
      <div className="text-2xl font-bold text-gray-900 mb-4">
        NFTMarket{' '}
        {isApproved ? (
          <Button className="bg-green-300">已授权</Button>
        ) : (
          <Button
            className="bg-red-300"
            onClick={() => {
              nftService.setApprovedForAll(MarketContractAddr, true)
            }}
          >
            点击授权
          </Button>
        )}
      </div>
      <div className="flex justify-between">
        <ListingNFT address={address}></ListingNFT>
        <TakeDownNFT address={address}></TakeDownNFT>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">MintNFT</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form
              onSubmit={(e) => {
                handleMintNFT(e)
              }}
            >
              <DialogHeader>
                <DialogTitle>请选择你想上传的NFT图片</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nfturi" className="text-right">
                    NFT图片
                  </Label>
                  <Input
                    id="nftaddr"
                    type="file"
                    className="col-span-3"
                    placeholder="ipfs://metadata CID"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFile(e.target.files[0])
                      }
                    }}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Mint</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <br />
      <div>
        <div className="flex">
          {data?.map((i: any) => {
            return <NFTItem key={i} address={address} tokenId={i} />
          })}
        </div>
      </div>
    </div>
  )
}
