import ListingNFT from './ListingNFT'
import { Button } from '@/components/ui/button'
import NFTItem from './NFTItem'
import { useAllNFTs } from '../utils/readContracts'
import { useMintNFT } from '../utils/writeContracts'

export default function NFTForm({ address }: { address: any }) {
  const AllNFTs = useAllNFTs()
  const tokenIdArr = Array.from(
    { length: AllNFTs ? AllNFTs.length : 0 },
    (_, i) => BigInt(i + 1)
  )

  const mintNFT = useMintNFT()
  const handleMintNFT = () => {
    mintNFT(address)
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
      <div className="text-2xl font-bold text-gray-900">NFTMarket</div>
      <div className="flex justify-between">
        <ListingNFT address={address}></ListingNFT>
        <Button onClick={handleMintNFT}>Mint NFT</Button>
      </div>
      <br />
      <div>
        <div>共有：{AllNFTs?.length} 个NFT</div>
      </div>
      <div>
        <div>
          {tokenIdArr?.map((i: any) => {
            return <NFTItem key={i} address={address} tokenId={i} />
          })}
        </div>
      </div>
    </div>
  )
}
