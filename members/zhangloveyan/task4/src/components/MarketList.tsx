import { NFTAllItem } from './type';
import { useAccount, useWriteContract } from 'wagmi'
import abi from '../abi';
import { ShouHuNFT, NFTMarket, ShouHuToken } from '../constant'

type NFTItemProps = {
    item: NFTAllItem;
};

const MarketList = ({ item }: NFTItemProps) => {
    const { writeContractAsync } = useWriteContract();
    const { address, isConnected } = useAccount();

    function buyNft(tokenId: number, price: number, seller: string) {
        if (!isConnected) {
            console.log('请先连接钱包');
        }

        // 先申请 使用代币 approve
        writeContractAsync({
            abi: abi.ShouHuToken,
            address: ShouHuToken,
            functionName: 'approve',
            args: [NFTMarket, price]
        }
        ).then(res => {
            console.log("MarketList-buyNft-approve-res", res);

            // 购买
            writeContractAsync(
                {
                    abi: abi.NFTMarket,
                    address: NFTMarket,
                    functionName: 'buyNFT',
                    args: [ShouHuNFT, tokenId]
                }
            ).then(res => {
                console.log("MarketList-buyNft-buyNFT-res", res);

                // 更新归属信息
                writeContractAsync(
                    {
                        abi: abi.ShouHuNFT,
                        address: ShouHuNFT,
                        functionName: 'updateInfo',
                        args: [seller, address, tokenId]
                    }
                ).then(res => {
                    console.log("MarketList-buyNft-updateInfo-res", res);

                }).catch(error => {
                    console.log("MarketList-buyNft-updateInfo-error", error.message);
                })
            }).catch(error => {
                console.log("MarketList-buyNft-buyNFT-error", error.message);
            })
        }).catch(error => {
            console.log("MarketList-buyNft-approve--error", error.message);
        })
    };

    return (
        <div style={{ border: '1px solid red', }}>
            <img style={{ border: '1px solid black' }} src={item.pic} alt="NFT Pic" />
            <div >
                <div>Token ID: {item.tokenId}</div>
                <div>NFT Contract: {item.nftContract}</div>
                <div>Seller: {item.seller}</div>
                <div>List Time: {item.listTime}</div>
                <div>Price: {item.price}</div>
                <div>
                    {item.isActive && item.seller != address ?
                        <button onClick={() => buyNft(item.tokenId, item.price, item.seller)}>购买</button> :
                        <div>

                        </div>
                    }
                </div>
            </div>
        </div >
    );
};

export default MarketList;
