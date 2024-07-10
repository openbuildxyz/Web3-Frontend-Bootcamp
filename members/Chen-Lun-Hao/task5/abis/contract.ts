const TOKEN_ADDR = "0xe740569aC8c8d015687836398C15De39aace1d9d";
const NFT_ADDR = "0xA41D22f1572d5d447CaA0d4184b0AcA848290753";
const EXCHANGE_ADDR = "0x3622d2eA236f622BA1f5d83e662bf423D40A8126";

import Web3FrontendToken from "./Web3FrontendToken";
import OpenBuildToken from "./OpenBuildToken";
import NFTExchange from "./NFTExchange";

function getTokenFuncVars(functionName: string, args?: any[]) {
  return {
    abi: OpenBuildToken,
    address: TOKEN_ADDR,
    functionName,
    args,
  } as any;
}

function getNftFuncVars(functionName: string, args?: any[]) {
  return {
    abi: Web3FrontendToken,
    address: NFT_ADDR,
    functionName,
    args,
  } as any;
}

function getExchangeFuncVars(functionName: string, args?: any[]) {
  return {
    abi: NFTExchange,
    address: EXCHANGE_ADDR,
    functionName,
    args,
  } as any;
}

export {
  TOKEN_ADDR,
  NFT_ADDR,
  EXCHANGE_ADDR,
  getTokenFuncVars,
  getNftFuncVars,
  getExchangeFuncVars,
};
