import {
  NFTDeListed as NFTDeListedEvent,
  NFTListed as NFTListedEvent,
  NFTPurchased as NFTPurchasedEvent
} from "../generated/NFTExchange/NFTExchange"
import { NFTDeListed, NFTListed, NFTPurchased } from "../generated/schema"

export function handleNFTDeListed(event: NFTDeListedEvent): void {
  let entity = new NFTDeListed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.nftContract = event.params.nftContract
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNFTListed(event: NFTListedEvent): void {
  let entity = new NFTListed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.seller = event.params.seller
  entity.nftContract = event.params.nftContract
  entity.tokenId = event.params.tokenId
  entity.price = event.params.price

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

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
