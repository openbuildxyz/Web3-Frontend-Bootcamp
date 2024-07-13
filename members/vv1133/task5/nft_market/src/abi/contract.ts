const VV_TOKEN_ADDR = "0x869e2f1a13cd09790ff0395b4ef6d245ca97a91e";
const VV_NFT_ADDR = "0xdbf34a7afc9e8b5d319fafb965f9ce25a2af6851";
const NFT_EXCHANGE_ADDR = "0xdB3b3325AaB10167Ac11353e4CE41951Dd42623f";

import VVToken from "./VVToken";
import VVNft from "./VVNft";
import NFTExchange from "./NFTExchange";

function getTokenFuncVars(functionName: string, args?: any[]) {
  return {
    abi: VVToken["VVToken"],
    address: VV_TOKEN_ADDR,
    functionName,
    args,
  } as any;
}

function getNftFuncVars(functionName: string, args?: any[]) {
  return {
    abi: VVNft["VVNft"],
    address: VV_NFT_ADDR,
    functionName,
    args,
  } as any;
}

function getExchangeFuncVars(functionName: string, args?: any[]) {
  return {
    abi: NFTExchange["NFTExchange"],
    address: NFT_EXCHANGE_ADDR,
    functionName,
    args,
  } as any;
}

export {
  VV_TOKEN_ADDR,
  VV_NFT_ADDR,
  NFT_EXCHANGE_ADDR,
  getTokenFuncVars,
  getNftFuncVars,
  getExchangeFuncVars,
};
