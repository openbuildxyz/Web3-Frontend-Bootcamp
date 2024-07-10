const OPENBUILDTOKEN_ADDR = "0xEF897c672F856Fddb9AE0c25AC0B57009a9B3E8F";
const MYTOKEN_ADDR = "0xfAB553Cc01D071B52EDE6eb57fee1E041DadC7a7";
const NFTMARKET_ADDR = "0x33c31e7BB6B0a73aC5264a2184DFE86C4C2e16f3";

import MyToken from "./MyToken";
import OpenBuildToken from "./OpenBuildToken";
import NFTMarket from "./NFTMarket";

function getTokenFuncVars(functionName: string, args?: any[]) {
  return {
    abi: OpenBuildToken,
    address: OPENBUILDTOKEN_ADDR,
    functionName,
    args,
  } as any;
}

function getNftFuncVars(functionName: string, args?: any[]) {
  return {
    abi: MyToken,
    address: MYTOKEN_ADDR,
    functionName,
    args,
  } as any;
}

function getExchangeFuncVars(functionName: string, args?: any[]) {
  return {
    abi: NFTMarket,
    address: NFTMARKET_ADDR,
    functionName,
    args,
  } as any;
}

export {
  OPENBUILDTOKEN_ADDR,
  MYTOKEN_ADDR,
  NFTMARKET_ADDR,
  getTokenFuncVars,
  getNftFuncVars,
  getExchangeFuncVars,
};
