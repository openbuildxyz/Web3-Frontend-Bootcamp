import { useAccount, useReadContracts, useWriteContract } from "wagmi"
import { wagmiERC721Contract, wagmiNFTMarketContract, nftMarket_address } from "../utils/env.config"
import { type UseReadContractsReturnType } from 'wagmi'
export const NFTMarketList = () => {
  // 发起上架，必先approve同意可以上架
  const account = useAccount();
  const { writeContract } = useWriteContract();
  // ERC721合约的余额查询
  const { data = [], isLoading }: UseReadContractsReturnType = useReadContracts({
    contracts: [
      {
        ...wagmiERC721Contract,
        functionName: 'balanceOf',
        args: [
          account.address
        ]
      }, {
        ...wagmiNFTMarketContract,
        functionName: 'getAllListings',
      }
    ]
  });
  const handleBuyNFT = (tokenId: string) => {

    writeContract({
      ...wagmiNFTMarketContract,
      functionName: 'buyNFT',
      args: [tokenId], // 替换为实际的地址
    });

  }
  const handlecancelListing = (tokenId: string) => {
    writeContract({
      ...wagmiNFTMarketContract,
      functionName: 'cancelListing',
      args: [tokenId], // 替换为实际的地址
    });
  }
  const ntfListData = data[1] as any;

  return (
    <div>
      {
        isLoading ? <>loading...</> :
          <>
            <div className="grid item-content mb-1 grid-rows-6">
              <div>合约地址</div>
              <div>卖家地址</div>
              <div>价格</div>
              <div>内容</div>
              <div>tokenId</div>
              <div>操作</div>
            </div>
            {
              ntfListData.result.map((item: { seller: string, price: number, tokenId: number, tokenURI: string }) => {
                return (
                  <div key={item.seller} className="grid item-content mb-1 grid-rows-6">
                    <div style={{ fontSize: '12px', width: '100%', overflow: 'scroll' }}>{nftMarket_address}</div>
                    <div style={{ fontSize: '12px', width: '100%', overflow: 'scroll' }}>{item.seller}</div>
                    <div>{item.price.toString()}</div>
                    <img className="img" src={item.tokenURI} alt="" />
                    <div>{item.tokenId.toString()}</div>
                    <div>
                      <button onClick={() => handleBuyNFT(item.tokenId.toString())}>购买</button>
                      <button onClick={() => handlecancelListing(item.tokenId.toString())}>取消</button>
                    </div>
                  </div>
                )
              })
            }
          </>
      }
    </div>
  )
}