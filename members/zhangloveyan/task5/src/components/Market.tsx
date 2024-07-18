import React from 'react';
import { useAccount, useReadContract } from 'wagmi'
import abi from '../abi';
import { NFTMarket, ShouHuNFT } from '../constant'
import { NFTItem, NFTAllItem } from "./type";
import dayjs from 'dayjs'
import MarketList from './MarketList';


function Market() {

  // token 对应的 url 也就是所有 token
  const { data: picUrl } = useReadContract({
    abi: abi.ShouHuNFT,
    address: ShouHuNFT,
    functionName: 'getAllTokenURIs'
  }) as { data: string[]; }
  console.log("picUrl", picUrl);

  // 获取所有上架信息
  const { data: listNFT } = useReadContract({
    abi: abi.NFTMarket,
    address: NFTMarket,
    functionName: 'getAllList',
    args: [ShouHuNFT]
  }) as { data: NFTItem[]; }
  console.log("listNFT", listNFT);

  let temp = [] as NFTAllItem[];
  if (picUrl != undefined && picUrl.length !== 0) {
    for (let index = 0; index < picUrl.length; index++) {

      let NFTItem = undefined;
      for (let idx = 0; idx < listNFT.length; idx++) {
        const element = listNFT[idx];
        if (element.tokenId == index + 1) {
          NFTItem = element;
          break;
        }
      }
      console.log("NFTItem", NFTItem);

      if (NFTItem == undefined) {
        // 未上架
        temp.push({
          tokenId: index + 1,
          nftContract: "-",
          seller: "-",
          listTime: "-",
          pic: picUrl[index],
          price: 0,
          isActive: false,
        })
      } else {
        // 已上架
        temp.push({
          tokenId: index + 1,
          nftContract: NFTItem.nftContract,
          seller: NFTItem.seller,
          listTime: dayjs(Number(NFTItem.listTime) * 1000).format('YYYY-MM-DD HH:mm:ss'),
          pic: picUrl[index],
          price: Number(NFTItem.price),
          isActive: NFTItem.isActive,
        })
      }
      NFTItem = undefined;
    }
    console.log("temp", temp);
  }

  return (
    <div>
      <h2>NFT市场</h2>
      <div style={{ display: 'flex', gap: '10px' }}>
        {temp != undefined && temp.map((item: NFTAllItem, index: any) => (
          <MarketList key={index} item={item} />
        ))}
      </div>
    </div>
  )
}

export default Market;
