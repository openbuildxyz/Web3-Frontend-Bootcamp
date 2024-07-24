// NFTList.tsx
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import moment from 'moment';
import { useScaffoldWriteContract, useScaffoldReadContract } from "~~/hooks/scaffold-eth";

interface NFTItem {
    tokenId: string;
    name: string;
    nft: string;
    seller: string;
    imageURL: string;
    price: string;
    listingTime: string;
}

// 定义从JSON文件中获取的数据类型
interface DataFromJson {
    name: string;
    description: string;
    image: string;
    attributes: {
        trait_type: string;
        value: string;
    }[];
}

interface NFTListProps {
    purchaseItem: (nft: NFTItem) => void;
    delistItem: (nft: NFTItem) => void;
}

const NFTList: React.FC<NFTListProps> = ({ purchaseItem, delistItem }) => {
    // 假设这是从智能合约获取的 NFT 列表数据
    let nfts: NFTItem[] = getListings(); // 你需要实现这个方法来获取数据

    nfts = nfts.filter(item =>{
        if(item.seller === "0x0000000000000000000000000000000000000000"){
            return false;
        }else{
            return true;
        }
    })
    // const [data, setData] = useState<DataFromJson | null>(null);

    useEffect(() => {
        // 使用Promise.all来并发获取所有数据
        // Promise.all(nfts.map(item => useScaffoldReadContract({
        //         contractName: "BasicNFT",
        //         functionName: "tokenURI",
        //         args: [BigInt(item.tokenId)],
        //     })
        // )).then(data => {
        //     setData(data);
        // });
      }, [nfts]); // 依赖数组包括ids，以确保当ids变化时重新获取数据

    useEffect(() => {
        nfts.forEach(async (item) => {
            // async () => {
                try {
                    // 替换为你的JSON文件URL
                    const response = await fetch(`https://crimson-defensive-lynx-259.mypinata.cloud/ipfs/QmbLoWq8ERBqdW95k4VEWcWWqrNAoAPTQmjdTyijPqn6We/${Number(item.tokenId)}.json`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const json: DataFromJson = await response.json();
                    item.imageURL = json.image;
                    if(Number(item.tokenId)===1){
                        item.imageURL = 'https://crimson-defensive-lynx-259.mypinata.cloud/ipfs/QmatG2yZJigVitdYQpEQTXjR4xGgXu4ruDSJRLfUhGZque/1.webp'
                    }
                    item.name = json.name;
                    // setData(json); // 设置状态以在组件中使用数据
                } catch (error) {
                    console.error('Fetching JSON failed:', error);
                }
            // };
        })

        console.log('nfts', nfts)
    });

    return (
        <div className="nft-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {nfts.map((nft) => (
                <div key={nft.tokenId} className="nft-item shadow-lg rounded-lg">
                    {/* <Image src={nft.imageURL} alt={nft.name} width={300} height={300} /> */}
                    <img src={nft.imageURL}  width="300" height="300" />
                    <div className="nft-details">
                        <h3 className="text-lg font-bold">{nft.name}</h3>
                        <p>合约地址: {nft.nft}</p>
                        <p>TokenID: {Number(nft.tokenId)}</p>
                        <p>拥有者: {nft.seller}</p>
                        <p>上架时间: {moment(Number(nft.listingTime)*1000).format('YYYY-MM-DD HH:mm:ss')}</p>
                        <p>价格: {Number(nft.price)} COT</p>
                    </div>
                    <div className='text-center'>
                        <button
                            className="bg-blue-500 text-white p-2 rounded mr-10"
                            onClick={() => purchaseItem(nft)}
                        >
                            购买
                        </button>
                        <button
                            className="bg-blue-500 text-white p-2 rounded"
                            onClick={() => delistItem(nft)}
                        >
                            下架
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

// 这个函数应该从智能合约获取 NFT 列表数据
// 这里只是一个示例实现，你需要根据你的后端逻辑进行调整
export function getListings(): NFTItem[] {

    const { data: listingsNFT } = useScaffoldReadContract({
        contractName: "NFTMarketplace",
        functionName: "queryAllListedNFTs",
        args: [],
    });
    console.log('listingsNFT', listingsNFT)

    // const json = fetchJsonData(0);
    // console.log('json', json)

    // let data = [
    //     // 填充示例数据
    //     { tokenID: '0', name: 'My NFT #1', contractAddress: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9', imageURL: 'https://crimson-defensive-lynx-259.mypinata.cloud/ipfs/QmatG2yZJigVitdYQpEQTXjR4xGgXu4ruDSJRLfUhGZque/0.webp', price: '12' },
    //     { tokenID: '1', name: 'My NFT #2', contractAddress: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9', imageURL: 'https://crimson-defensive-lynx-259.mypinata.cloud/ipfs/QmatG2yZJigVitdYQpEQTXjR4xGgXu4ruDSJRLfUhGZque/1.webp', price: '20' },
    // ];

    // data.forEach((item, index) => {
    //     const { data: ownerOf } = useScaffoldReadContract({
    //         contractName: "BasicNFT",
    //         functionName: "ownerOf",
    //         args: [BigInt(item.tokenID)],
    //     });
    //     data[index].owerner = ownerOf;
    // })

    return listingsNFT??[];
}

export default NFTList;