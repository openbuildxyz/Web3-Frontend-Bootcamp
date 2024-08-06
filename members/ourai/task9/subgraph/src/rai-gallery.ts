import {
  NftListed as NftListedEvent,
  NftSold as NftSoldEvent,
  NftUnlisted as NftUnlistedEvent
} from "../generated/RaiGallery/RaiGallery"
import { NftListed, NftSold, NftUnlisted } from "../generated/schema"

export function handleNftListed(event: NftListedEvent): void {
  let entity = new NftListed(
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

export function handleNftSold(event: NftSoldEvent): void {
  let entity = new NftSold(
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

export function handleNftUnlisted(event: NftUnlistedEvent): void {
  let entity = new NftUnlisted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.seller = event.params.seller
  entity.nftContract = event.params.nftContract
  entity.tokenId = event.params.tokenId
  entity.unlistedAt = event.params.unlistedAt

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
