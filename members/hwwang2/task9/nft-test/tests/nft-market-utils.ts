import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  ItemListed,
  ItemUpdated,
  NftReceived,
  Purchase,
  Revoke
} from "../generated/NFTMarket/NFTMarket"

export function createItemListedEvent(
  seller: Address,
  nftAddress: Address,
  tokenId: BigInt,
  price: BigInt
): ItemListed {
  let itemListedEvent = changetype<ItemListed>(newMockEvent())

  itemListedEvent.parameters = new Array()

  itemListedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return itemListedEvent
}

export function createItemUpdatedEvent(
  seller: Address,
  nftAddr: Address,
  tokenId: BigInt,
  newPrice: BigInt
): ItemUpdated {
  let itemUpdatedEvent = changetype<ItemUpdated>(newMockEvent())

  itemUpdatedEvent.parameters = new Array()

  itemUpdatedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  itemUpdatedEvent.parameters.push(
    new ethereum.EventParam("nftAddr", ethereum.Value.fromAddress(nftAddr))
  )
  itemUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  itemUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newPrice",
      ethereum.Value.fromUnsignedBigInt(newPrice)
    )
  )

  return itemUpdatedEvent
}

export function createNftReceivedEvent(
  _from: Address,
  _to: Address,
  _tokenId: BigInt,
  _data: Bytes
): NftReceived {
  let nftReceivedEvent = changetype<NftReceived>(newMockEvent())

  nftReceivedEvent.parameters = new Array()

  nftReceivedEvent.parameters.push(
    new ethereum.EventParam("_from", ethereum.Value.fromAddress(_from))
  )
  nftReceivedEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  )
  nftReceivedEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenId",
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    )
  )
  nftReceivedEvent.parameters.push(
    new ethereum.EventParam("_data", ethereum.Value.fromBytes(_data))
  )

  return nftReceivedEvent
}

export function createPurchaseEvent(
  buyer: Address,
  nftAddr: Address,
  tokenId: BigInt,
  price: BigInt
): Purchase {
  let purchaseEvent = changetype<Purchase>(newMockEvent())

  purchaseEvent.parameters = new Array()

  purchaseEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  purchaseEvent.parameters.push(
    new ethereum.EventParam("nftAddr", ethereum.Value.fromAddress(nftAddr))
  )
  purchaseEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  purchaseEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return purchaseEvent
}

export function createRevokeEvent(
  seller: Address,
  nftAddr: Address,
  tokenId: BigInt
): Revoke {
  let revokeEvent = changetype<Revoke>(newMockEvent())

  revokeEvent.parameters = new Array()

  revokeEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  revokeEvent.parameters.push(
    new ethereum.EventParam("nftAddr", ethereum.Value.fromAddress(nftAddr))
  )
  revokeEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return revokeEvent
}
