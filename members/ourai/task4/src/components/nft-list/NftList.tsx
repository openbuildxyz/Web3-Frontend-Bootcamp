import { List, message } from 'antd'
import { useReadContract, useWriteContract } from 'wagmi'
import { NFTCard, useAccount } from '@ant-design/web3'

import type { NftItem } from '../../types'
import { RAIG_ADDR } from '../../constants'
import { genCoinFuncVars, genGalleryFuncVars } from '../../utils'

import NftCardFooter from './NftCardFooter'

const DEFAULT_IMAGE = 'https://api.our-metaverse.xyz/ourms/6_pnghash_0cecc6d080015b34f60bdd253081f36e277ce20ceaf7a6340de3b06d2defad6a_26958469.webp'

function resolveActionText(nft: NftItem, account: any): string {
  return !account || nft.seller !== account.address ? 'Buy' : 'Not for sale'
}

function NftList() {
  const { account: signer } = useAccount()
  const [messageApi, contextHolder] = message.useMessage()
  const { writeContractAsync } = useWriteContract()
  const result = useReadContract(genGalleryFuncVars('getAll'))
  const nfts = ((result.data || []) as NftItem[]).filter(nft => nft.listing)

  const buyNft = (nft: NftItem) => {
    if (!signer) {
      return messageApi.warning('Please connect wallet first.')
    }

    if (nft.seller === signer.address) {
      return messageApi.warning(`NFT ${nft.nftContract}#${Number(nft.tokenId)} is not for sale.`)
    }

    writeContractAsync(genCoinFuncVars('approve', [RAIG_ADDR, nft.price]))
      .then(res => {
        console.log('approve success', res)
        writeContractAsync(genGalleryFuncVars('buy', [nft.nftContract, nft.tokenId]))
          .then(res => {
            console.log('buy success: ', res)
            messageApi.success('Buy success')
          })
          .catch(err => {
            console.log('buy failed', err.message)
            messageApi.error('Buy failed')
          })
      })
      .catch(err => {
        console.log('approve failed', err.message)
        messageApi.error('approve failed')
      })
  }

  return (
    <>
      {contextHolder}
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 4 }}
        dataSource={nfts}
        renderItem={nft => (
          <List.Item>
            <NFTCard
              key={`${nft.nftContract}#${nft.tokenId}`}
              tokenId={nft.tokenId}
              price={{ value: nft.price, decimals: 2, symbol: 'RAIC' }}
              image={nft.tokenUrl || DEFAULT_IMAGE}
              footer={<NftCardFooter dataSource={nft} />}
              showAction
              actionText={resolveActionText(nft, signer)}
              onActionClick={() => buyNft(nft)}
            />
          </List.Item>
        )}
      />
    </>
  )
}

export default NftList
