import {
  NFTExchanged as NFTExchangedEvent,
  NFTInactivated as NFTInactivatedEvent,
  NFTItemAdded as NFTItemAddedEvent
} from "../generated/NFTExchange/NFTExchange"
import { NFTExchanged, NFTInactivated, NFTItemAdded } from "../generated/schema"

export function handleNFTExchanged(event: NFTExchangedEvent): void {
  let entity = new NFTExchanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nftContract = event.params.nftContract
  entity.tokenId = event.params.tokenId
  entity.buyer = event.params.buyer
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNFTInactivated(event: NFTInactivatedEvent): void {
  let entity = new NFTInactivated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nftContract = event.params.nftContract
  entity.tokenId = event.params.tokenId
  entity.seller = event.params.seller

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNFTItemAdded(event: NFTItemAddedEvent): void {
  let entity = new NFTItemAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nftContract = event.params.nftContract
  entity.tokenId = event.params.tokenId
  entity.seller = event.params.seller
  entity.price = event.params.price
  entity.addTime = event.params.addTime

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
