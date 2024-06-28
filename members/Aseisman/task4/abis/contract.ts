// const TOKEN_ADDR = "0x5B497dBd93C4e64F5402733108976c76e4efed5a";
// const NFT_ADDR = "0xa16F0175Fbb0E77282276538EF7b02A81Faa656b";
// const EXCHANGE_ADDR = "0x2B88aC83015B2A6789Ee33A19837428eabe8E3ed";


const TOKEN_ADDR = "0x8B29c8d3c861531f3Fe049Dc6B8e9Df40bf85A31";
const NFT_ADDR = "0x2010649a64b82D97ccF92BdA027D4FFbB132E62e";
const EXCHANGE_ADDR = "0x8Cbe6Dc64858F07DE1Db462dc7c974977F00a5Fd";

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
