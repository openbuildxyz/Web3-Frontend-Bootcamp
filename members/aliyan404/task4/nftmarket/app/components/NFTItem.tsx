import React from 'react'
import { useListings } from '../utils/readContracts'
import { WFTContractAddr } from '../utils/contractAddr'
import { Button } from '@/components/ui/button'
import { useBuyNFT } from '../utils/writeContracts'

export default function NFTItem({
  address,
  tokenId,
}: {
  address: any
  tokenId: bigint
}) {
  console.log('tokenId:' + tokenId)
  const nftListings = useListings(WFTContractAddr, tokenId)
  console.log(nftListings)
  const isSeller = address === nftListings?.[0]
  const isSaled = nftListings?.[4] ? false : true

  const buyNFT = useBuyNFT()

  const handleBuyNFT = async () => {
    try {
      if (address === nftListings?.[0]) {
        alert('不能购买自己的NFT')
        return
      }
      if (!nftListings?.[4]) {
        alert('该NFT已售出')
      }
      console.log('isBuy', nftListings?.[4])
      buyNFT(tokenId)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="flex flex-row p-4 bg-white rounded-lg shadow-md m-5 space-btween">
      <div className="border-2 border-gray-300 m-2 p-1 rounded-lg shadow-md">
        合约地址: {nftListings?.[1]}
      </div>
      <div className="border-2 border-gray-300 m-2 p-1 rounded-lg shadow-md">
        Token ID: {nftListings?.[2].toString()}
      </div>
      <div className="border-2 border-gray-300 m-2 p-1 rounded-lg shadow-md">
        价格: {nftListings?.[3].toString()}
      </div>
      <div className="border-2 border-gray-300 m-2 p-1 rounded-lg shadow-md">
        卖家地址: {nftListings?.[0]}
      </div>
      {isSaled ? (
        <Button className="m-6 ml-10 bg-red-400">saled</Button>
      ) : isSeller ? (
        <Button className="m-6 ml-10 bg-stone-600">ur the seller</Button>
      ) : (
        <Button onClick={handleBuyNFT} className="m-6 ml-10 bg-green-400">
          购买
        </Button>
      )}
    </div>
  )
}
