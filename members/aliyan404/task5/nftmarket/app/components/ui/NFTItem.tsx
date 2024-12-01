import React from 'react'
import { NFTContractAddr } from '../../utils/contractAddr'
import { Button } from '@/components/ui/button'
import useSWR from 'swr'
import { marketService, nftService } from '@/app/service'

export default function NFTItem({
  address,
  tokenId,
}: {
  address: any
  tokenId: bigint
}) {
  console.log(tokenId)
  const { data: nftListings }: { data: any } = useSWR(
    ['getlistings', NFTContractAddr, tokenId],
    async () => {
      try {
        const res = await marketService.getListings(NFTContractAddr, tokenId)
        return res
      } catch (error: any) {
        console.log('获取NFT列表失败！', error.message)
      }
    }
  )

  const { data: nfturi }: { data: any } = useSWR(
    ['getnfturi', tokenId],
    async () => {
      try {
        const uri = await nftService.getTokenURI(tokenId)
        console.log('uri: ', uri, nftListings?.[2])
        return uri
      } catch (error: any) {
        console.log('获取NFT URI失败！', error.message)
      }
    }
  )
  console.log('listings: ', nftListings)

  const isSeller = address === nftListings?.[0]
  const isSaled = nftListings?.[4] ? false : true

  const handleBuyNFT = () => {
    try {
      // 购买NFT
      marketService.buyNFT(NFTContractAddr, tokenId)
    } catch (e: any) {
      console.log('购买失败！', e.message)
    }
  }

  if (isSaled) return null

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md m-5 w-1/5 flex-shrink-0">
      <img src={nfturi} className="w-full h-full" />
      <div className="flex flex-col p-4 flex-shrink-0">
        <div className="overflow-hidden text-ellipsis whitespace-nowrap font-bold m-1 text-xs">
          seller: {nftListings?.[0]}
        </div>
        <div className="overflow-hidden text-ellipsis whitespace-nowrap font-bold m-1 text-xs">
          tokenId: {nftListings?.[2].toString()}
        </div>
        <div className="flex justify-center items-center">
          {isSaled ? (
            <Button className="m-2  bg-red-400">not available</Button>
          ) : isSeller ? (
            <Button className="m-2  bg-stone-600">ur the seller</Button>
          ) : (
            <Button
              onClick={handleBuyNFT}
              className="m-2 bg-green-500 flex-shrink-0 h-10 w-48"
            >
              {nftListings?.[3].toString()} OBT
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
