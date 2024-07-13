import {
  NFTListed as NFTListedEvent,
  NFTPurchased as NFTPurchasedEvent,
  NFTUnListed as NFTUnListedEvent
} from "../generated/NFTMarket/NFTMarket"
import { NFTListed, NFTPurchased, NFTUnListed } from "../generated/schema"

export function handleNFTListed(event: NFTListedEvent): void {
  let entity = new NFTListed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.seller = event.params.seller
  entity.nftContract = event.params.nftContract
  entity.tokenId = event.params.tokenId
  entity.price = event.params.price
  entity.isActive = event.params.isActive
  entity.listTime = event.params.listTime

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNFTPurchased(event: NFTPurchasedEvent): void {
  let entity = new NFTPurchased(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.buyer = event.params.buyer
  entity.nftContract = event.params.nftContract
  entity.tokenId = event.params.tokenId
  entity.price = event.params.price
  entity.isActive = event.params.isActive
  entity.buyTime = event.params.buyTime

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNFTUnListed(event: NFTUnListedEvent): void {
  let entity = new NFTUnListed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.seller = event.params.seller
  entity.nftContract = event.params.nftContract
  entity.tokenId = event.params.tokenId
  entity.price = event.params.price
  entity.isActive = event.params.isActive
  entity.unListTime = event.params.unListTime

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
