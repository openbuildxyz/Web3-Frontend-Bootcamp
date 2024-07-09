import {
  MarketContractAddr,
  NFTContractAddr,
  OBTContractAddr,
} from '../utils/contractAddr'
import { MarketService } from './MarketService'
import { NFTService } from './NFTService'
import { OBTService } from './OBTService'

export const nftService = new NFTService({
  contractAddress: NFTContractAddr,
})

export const obtService = new OBTService({
  contractAddress: OBTContractAddr,
})

export const marketService = new MarketService({
  contractAddress: MarketContractAddr,
})
