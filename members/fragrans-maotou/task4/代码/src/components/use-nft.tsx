
import { useReadContract, useAccount, useWriteContract } from "wagmi";
import { wagmiERC721Contract, wagmiNFTMarketContract, nftMarket_address } from "../utils/env.config"
import { useCallback, useEffect, useState } from "react";
import { useEthersProvider } from "../utils/ethers";
import { ethers } from "ethers";


const checkTokenOwnership = async (provider: ethers.JsonRpcProvider | ethers.FallbackProvider | undefined, arrayTokenIds: number[], address: string) => {

  const contract = new ethers.Contract(wagmiERC721Contract.address, wagmiERC721Contract.abi, provider);

  const ownerTokenIds = [];
  const allTokenIdSize = arrayTokenIds.length;

  for (let i = 0; i < allTokenIdSize; i++) {
    try {
      const tokenId = await contract.tokenOfOwnerByIndex(address, arrayTokenIds[i]);
      console.log("tokenId", tokenId);
      ownerTokenIds.push(tokenId.toString());
    } catch (error) {
      continue;
    }




  }

  // 使用 Promise.all 等待所有异步操作完成
  const results = await Promise.all(ownerTokenIds.map(async (item: number) => {
    let is_grounding = false;
    let token_uri = "";
    try {
      // 检查 tokenId 的所有者
      const owner = await contract.ownerOf(item);
      token_uri = await contract.getTokenURI(item);
      is_grounding = (address !== owner);
    } catch (error) {
      console.error(`Error fetching owner for token ${item}:`, error);
    }

    return {
      token_id: item,
      is_grounding,
      token_uri,
    };
  }));

  return results;
};

export const UseNFT = () => {

  const [inputValues, setInputValues] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [ownershipData, setOwnershipData] = useState<Array<{ token_id: number, is_grounding: boolean, token_uri: string }>>([]);
  const { address } = useAccount()
  const { writeContract } = useWriteContract()
  const provider = useEthersProvider()
  const { data = [] } = useReadContract({
    ...wagmiERC721Contract,
    functionName: 'getAllTokenIds'
  });
  const arrayTokenIds = data as Array<number>;

  const getCheckTokenOwnerShip = useCallback((tokenIds: Array<number>) => {

    checkTokenOwnership(provider, tokenIds, address as `0x${string}`)
      .then(results => {
        setOwnershipData(results);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error checking token ownership:', error);
        setLoading(false);
      });
  }, [address, provider]);

  // 给予授权的标签
  useEffect(() => {
    getCheckTokenOwnerShip(arrayTokenIds);
  }, [getCheckTokenOwnerShip, arrayTokenIds]);


  if (loading) return <>loading...</>;





  const handlelistNFT = async (tokenId: string) => {
    // 上架NFT
    writeContract({
      ...wagmiNFTMarketContract,
      functionName: 'listNFT',
      args: [tokenId, inputValues[tokenId]], // 替换为实际的地址
    });

  }
  const handleAutoItem = (tokenId: string) => {
    // 授权后可以上架
    writeContract({
      ...wagmiERC721Contract,
      functionName: 'approve',
      args: [nftMarket_address, tokenId], // 替换为实际的地址
    });

  }
  const handleNFTAuth = () => {
    // 授权全部上架
    writeContract({
      ...wagmiERC721Contract,
      functionName: 'setApprovalForAll',
      args: [nftMarket_address, true], // 替换为实际的地址
    });

  }
  return (
    <div>
      <h2>用户自己的NFT</h2>
      <div>
        是否要给自己的NFT全部授权
        <button onClick={handleNFTAuth}>点击授权</button>
      </div>
      <div className="grid item-content mb-1 grid-rows-5">
        <div> tokenId</div>
        <div> 价格</div>
        <div> 内容</div>
        <div> 授权该NFT</div>
        <div> 上架</div>
      </div>
      <>
        {
          ownershipData.map((item: { token_id: number, is_grounding: boolean, token_uri: string }) => {
            return (
              <div key={item.token_id.toString()} className="grid item-content mb-1 grid-rows-5">
                <div className="self-center">{item.token_id.toString()}</div>
                <div>
                  <input type="number" id={`inputid-${item.token_id.toString()}`}
                    name={`inputname-${item.token_id.toString()}`}
                    value={inputValues[item.token_id.toString()]}
                    onChange={(e) => setInputValues({
                      ...inputValues,
                      [item.token_id.toString()]: Number(e.target.value),
                    })} />
                </div>
                <img className="img" src={item.token_uri} alt="this is NFTImg" />
                <button onClick={() => handleAutoItem(item.token_id.toString())}>
                  点击授权
                </button>
                {
                  item.is_grounding ? <div>已上架</div> :
                    <button onClick={() => handlelistNFT(item.token_id.toString())}>
                      上架NFT
                    </button>
                }
              </div>
            )
          })
        }
      </>

    </div>
  )
}