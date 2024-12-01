import type { PropsWithChildren } from 'react'
import { Address } from '@ant-design/web3'

export type NftItem = {
  seller: string;
  nftContract: string;
  tokenId: number;
  price: bigint;
  url: string;
  timestamp: bigint;
  isActive: boolean;
}

export function NftCardFooter(props: PropsWithChildren<{ dataSource: NftItem }>) {
  const { dataSource } = props

  return (
    <div className="NftCardFooter">
      <div>
        <span>合约地址</span>
        <Address address={dataSource.nftContract} ellipsis={{ headClip: 8, tailClip: 6 }} copyable />
      </div>
      <div>
        <span>卖家地址</span>
        <Address address={dataSource.seller} ellipsis={{ headClip: 8, tailClip: 6 }} copyable />
      </div>
    </div>
  )
}

