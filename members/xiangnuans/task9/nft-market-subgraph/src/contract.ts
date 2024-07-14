import {
  NFTBought as NFTBoughtEvent,
  NFTListed as NFTListedEvent,
  NFTStatusChanged as NFTStatusChangedEvent
} from "../generated/Contract/Contract"
import { NFTBought, NFTListed, NFTStatusChanged } from "../generated/schema"

export function handleNFTBought(event: NFTBoughtEvent): void {
  let entity = new NFTBought(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nftAddress = event.params.nftAddress
  entity.tokenId = event.params.tokenId
  entity.buyer = event.params.buyer
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNFTListed(event: NFTListedEvent): void {
  let entity = new NFTListed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nftAddress = event.params.nftAddress
  entity.tokenId = event.params.tokenId
  entity.seller = event.params.seller
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNFTStatusChanged(event: NFTStatusChangedEvent): void {
  let entity = new NFTStatusChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nftAddress = event.params.nftAddress
  entity.tokenId = event.params.tokenId
  entity.seller = event.params.seller
  entity.onSale = event.params.onSale

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
