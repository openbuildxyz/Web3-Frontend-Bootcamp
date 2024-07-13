import { NFTAllItem } from './type';
import { useAccount, useWriteContract } from 'wagmi'
import abi from '../abi';
import { ShouHuNFT, NFTMarket } from '../constant'
import { useState } from 'react';

type NFTItemProps = {
    item: NFTAllItem;
};

const NFTItem = ({ item }: NFTItemProps) => {
    const { writeContractAsync } = useWriteContract();
    const { address, isConnected } = useAccount();
    const [price, setPrice] = useState(0);

    function unlist(tokenId: number) {
        if (!isConnected) {
            console.log('请先连接钱包');
        }
    };

    const list = (tokenId: number, price: number) => {
        if (!isConnected) {
            console.log('请先连接钱包');
        }

        // 先申请 approve
        writeContractAsync(
            {
                abi: abi.ShouHuNFT,
                address: ShouHuNFT,
                functionName: 'setApprovalForAll',
                args: [NFTMarket, true]
            }
        ).then(res => {
            console.log("setApprovalForAll-res", res);

            // 上架
            writeContractAsync(
                {
                    abi: abi.NFTMarket,
                    address: NFTMarket,
                    functionName: 'listNFT',
                    args: [ShouHuNFT, tokenId, price]
                }
            ).then(res => {
                console.log("listNFT-res", res);

            }).catch(error => {
                console.log("listNFT-error", error.message);
            })
        }).catch(error => {
            console.log("setApprovalForAll-error", error.message);
        })
    };

    const handleInputChange = (event: any) => {
        console.log(event, 'even6t');

        setPrice(event?.target.value);
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
                    {item.isActive ?
                        <div/> :
                        <div>
                            <input onChange={handleInputChange} />
                            <button onClick={() => list(item.tokenId, price)}>上架</button>
                        </div>
                    }
                </div>
            </div>
        </div >
    );
};

export default NFTItem;
