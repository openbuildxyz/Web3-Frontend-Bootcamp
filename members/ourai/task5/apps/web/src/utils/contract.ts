import { RAIC_ADDR, RAIE_ADDR, RAIG_ADDR } from '../constants'
import abis from '../abis'

function genCoinFuncVars(functionName: string, args?: any[]) {
  return { abi: abis.RaiCoin, address: RAIC_ADDR, functionName, args } as any
}

function genNftFuncVars(functionName: string, args?: any[]) {
  return { abi: abis.RaiE, address: RAIE_ADDR, functionName, args } as any
}

function genGalleryFuncVars(functionName: string, args?: any[]) {
  return { abi: abis.RaiGallery, address: RAIG_ADDR, functionName, args } as any
}

export { genCoinFuncVars, genNftFuncVars, genGalleryFuncVars }
