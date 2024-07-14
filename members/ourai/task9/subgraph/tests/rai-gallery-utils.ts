import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  NftListed,
  NftSold,
  NftUnlisted
} from "../generated/RaiGallery/RaiGallery"

export function createNftListedEvent(
  seller: Address,
  nftContract: Address,
  tokenId: BigInt,
  price: BigInt
): NftListed {
  let nftListedEvent = changetype<NftListed>(newMockEvent())

  nftListedEvent.parameters = new Array()

  nftListedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  nftListedEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract)
    )
  )
  nftListedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  nftListedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return nftListedEvent
}

export function createNftSoldEvent(
  buyer: Address,
  nftContract: Address,
  tokenId: BigInt,
  price: BigInt
): NftSold {
  let nftSoldEvent = changetype<NftSold>(newMockEvent())

  nftSoldEvent.parameters = new Array()

  nftSoldEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  nftSoldEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract)
    )
  )
  nftSoldEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  nftSoldEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return nftSoldEvent
}

export function createNftUnlistedEvent(
  seller: Address,
  nftContract: Address,
  tokenId: BigInt,
  unlistedAt: BigInt
): NftUnlisted {
  let nftUnlistedEvent = changetype<NftUnlisted>(newMockEvent())

  nftUnlistedEvent.parameters = new Array()

  nftUnlistedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  nftUnlistedEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract)
    )
  )
  nftUnlistedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  nftUnlistedEvent.parameters.push(
    new ethereum.EventParam(
      "unlistedAt",
      ethereum.Value.fromUnsignedBigInt(unlistedAt)
    )
  )

  return nftUnlistedEvent
}
