import { List, message } from 'antd'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { NFTCard } from '@ant-design/web3'
import type { NftItem } from './NftCard'
import { NftCardFooter }from './NftCard'
import { getTokenFuncVars, getNftFuncVars, getExchangeFuncVars } from '../abi/contract'
import { VV_TOKEN_ADDR, VV_NFT_ADDR, NFT_EXCHANGE_ADDR } from '../abi/contract'

function resolveActionText(nft: NftItem, account: any): string {
  if (!account) {
    return 'Buy'
  }

  if (nft.seller === account.address) {
    return nft.isActive ? 'Unlist' : 'List'
  }

  return nft.isActive ? 'Buy' : 'Not for sale'
}

function NftList() {
  const signer = useAccount()
  const [messageApi, contextHolder] = message.useMessage()
  const { writeContractAsync } = useWriteContract()
  const result = useReadContract(getExchangeFuncVars('getAll'))
  const nfts = (result.data || []) as NftItem[]
  console.log(nfts)

  const buyOrUnlistNft = (nft: NftItem) => {
    if (!signer) {
      return messageApi.warning('Please connect wallet first.')
    }

    if (!nft.isActive) {
      if (nft.seller === signer.address) {
        return messageApi.warning(`NFT ${nft.nftContract}#${Number(nft.tokenId)} is yours, please use sell button.`)
      } else {
        return messageApi.warning(`NFT ${nft.nftContract}#${Number(nft.tokenId)} is not for sale.`)
      }
    }

    if (nft.seller === signer.address) {
      writeContractAsync(getExchangeFuncVars('delistNFT', [nft.nftContract, nft.tokenId]))
        .then(res => {
          console.log('delist success: ', res)
          messageApi.success('Delist success')
        })
        .catch(err => {
          console.log('delist failed', err.message)
          messageApi.error('Delist failed')
        })
    } else {
      writeContractAsync(getTokenFuncVars('approve', [NFT_EXCHANGE_ADDR, nft.price]))
        .then(res => {
          console.log('approve success', res)
          writeContractAsync(getExchangeFuncVars('buyNFT', [nft.nftContract, nft.tokenId]))
            .then(res => {
              console.log('buy success: ', res)
               messageApi.success('Buy success')
            })
            .catch(err => {
              console.log('buy failed', err.message)
	      console.log(nft.nftContract)
	      console.log(nft.tokenId)
              messageApi.error('Buy failed')
            })
        })
        .catch(err => {
          console.log('approve failed', err.message)
          messageApi.error('approve failed')
        })
    }
  }

  return (
    <div>
      {contextHolder}
      <List
        grid={{ gutter: 20, xs: 2, sm: 3, md: 6 }}
        dataSource={nfts}
        renderItem={nft => (
          <List.Item>
            <NFTCard
              key={`${nft.nftContract}#${nft.tokenId}`}
              tokenId={nft.tokenId}
              price={{ value: nft.price, decimals: 6, symbol: 'VVT' }}
              image={nft.url}
              footer={<NftCardFooter dataSource={nft} />}
              showAction
              actionText={resolveActionText(nft, signer)}
              onActionClick={() => buyOrUnlistNft(nft)}
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default NftList
