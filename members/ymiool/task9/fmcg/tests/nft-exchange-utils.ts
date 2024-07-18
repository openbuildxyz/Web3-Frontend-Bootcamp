import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  NFTExchanged,
  NFTInactivated,
  NFTItemAdded
} from "../generated/NFTExchange/NFTExchange"

export function createNFTExchangedEvent(
  nftContract: Address,
  tokenId: BigInt,
  buyer: Address,
  price: BigInt
): NFTExchanged {
  let nftExchangedEvent = changetype<NFTExchanged>(newMockEvent())

  nftExchangedEvent.parameters = new Array()

  nftExchangedEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract)
    )
  )
  nftExchangedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  nftExchangedEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  nftExchangedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return nftExchangedEvent
}

export function createNFTInactivatedEvent(
  nftContract: Address,
  tokenId: BigInt,
  seller: Address
): NFTInactivated {
  let nftInactivatedEvent = changetype<NFTInactivated>(newMockEvent())

  nftInactivatedEvent.parameters = new Array()

  nftInactivatedEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract)
    )
  )
  nftInactivatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  nftInactivatedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )

  return nftInactivatedEvent
}

export function createNFTItemAddedEvent(
  nftContract: Address,
  tokenId: BigInt,
  seller: Address,
  price: BigInt,
  addTime: BigInt
): NFTItemAdded {
  let nftItemAddedEvent = changetype<NFTItemAdded>(newMockEvent())

  nftItemAddedEvent.parameters = new Array()

  nftItemAddedEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract)
    )
  )
  nftItemAddedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  nftItemAddedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  nftItemAddedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  nftItemAddedEvent.parameters.push(
    new ethereum.EventParam(
      "addTime",
      ethereum.Value.fromUnsignedBigInt(addTime)
    )
  )

  return nftItemAddedEvent
}
