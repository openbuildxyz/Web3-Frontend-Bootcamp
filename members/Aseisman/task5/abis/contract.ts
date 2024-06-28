const TOKEN_ADDR = "0x8B29c8d3c861531f3Fe049Dc6B8e9Df40bf85A31";
const NFT_ADDR = "0x2010649a64b82D97ccF92BdA027D4FFbB132E62e";
// const EXCHANGE_ADDR = "0xA5D3C8Dc5129A3626f42B6ef03e7bBa1D3e702EA";
// const EXCHANGE_ADDR = "0xb044253631A52e58b4c31B0d405a5251A6Dc240a";
const EXCHANGE_ADDR = "0x688B2E1556e826a405E7529f0c26c86c551A41B9";

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
