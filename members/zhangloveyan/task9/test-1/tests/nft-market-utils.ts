import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  NFTListed,
  NFTPurchased,
  NFTUnListed
} from "../generated/NFTMarket/NFTMarket"

export function createNFTListedEvent(
  seller: Address,
  nftContract: Address,
  tokenId: BigInt,
  price: BigInt,
  isActive: boolean,
  listTime: BigInt
): NFTListed {
  let nftListedEvent = changetype<NFTListed>(newMockEvent())

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
  nftListedEvent.parameters.push(
    new ethereum.EventParam("isActive", ethereum.Value.fromBoolean(isActive))
  )
  nftListedEvent.parameters.push(
    new ethereum.EventParam(
      "listTime",
      ethereum.Value.fromUnsignedBigInt(listTime)
    )
  )

  return nftListedEvent
}

export function createNFTPurchasedEvent(
  buyer: Address,
  nftContract: Address,
  tokenId: BigInt,
  price: BigInt,
  isActive: boolean,
  buyTime: BigInt
): NFTPurchased {
  let nftPurchasedEvent = changetype<NFTPurchased>(newMockEvent())

  nftPurchasedEvent.parameters = new Array()

  nftPurchasedEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  nftPurchasedEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract)
    )
  )
  nftPurchasedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  nftPurchasedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  nftPurchasedEvent.parameters.push(
    new ethereum.EventParam("isActive", ethereum.Value.fromBoolean(isActive))
  )
  nftPurchasedEvent.parameters.push(
    new ethereum.EventParam(
      "buyTime",
      ethereum.Value.fromUnsignedBigInt(buyTime)
    )
  )

  return nftPurchasedEvent
}

export function createNFTUnListedEvent(
  seller: Address,
  nftContract: Address,
  tokenId: BigInt,
  price: BigInt,
  isActive: boolean,
  unListTime: BigInt
): NFTUnListed {
  let nftUnListedEvent = changetype<NFTUnListed>(newMockEvent())

  nftUnListedEvent.parameters = new Array()

  nftUnListedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  nftUnListedEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract)
    )
  )
  nftUnListedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  nftUnListedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  nftUnListedEvent.parameters.push(
    new ethereum.EventParam("isActive", ethereum.Value.fromBoolean(isActive))
  )
  nftUnListedEvent.parameters.push(
    new ethereum.EventParam(
      "unListTime",
      ethereum.Value.fromUnsignedBigInt(unListTime)
    )
  )

  return nftUnListedEvent
}
