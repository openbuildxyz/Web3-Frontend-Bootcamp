
import { useState } from "react";
import { Input, Button, InputNumber, Space, Table, Tag } from 'antd';
import { getMarketContract, getNFTContract, getTokenContract } from "@/config/contract";
import { ethers } from "ethers";
import type { TableProps } from 'antd';

interface DataType {
    key: string;
    seller: string;
    nftContract: string;
    tokenId: string;
    price: number;
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '上架者地址',
        dataIndex: 'seller',
        key: 'seller',
    },
    {
        title: ' NFT 合约地址',
        dataIndex: 'nftContract',
        key: 'nftContract',
    },
    {
        title: 'NFT的Token ID',
        dataIndex: 'tokenId',
        key: 'tokenId',
    },
    {
        title: '上架价格（使用ERC20代币）',
        key: 'price',
        dataIndex: 'price',
    }
];



export default function Home() {
    const [erc721Addr, setErc721Addr] = useState<string>("0x6F817c5d3ccd451fd38B4cB77E78d85FD1F0810d");
    const [tokenId, setTokenId] = useState<string>("");
    const [price, setPrice] = useState<number | null>(null);
    const [listId, setListId] = useState<number | null>(null);
    const [listings, setListings] = useState<DataType[]>([])




    const listNFT = async () => {
        const { contract, signer } = await getMarketContract();
        await contract.connect(signer).listNFT(erc721Addr, tokenId, price);
    };

    const buyNFT = async () => {
        const { contract: market, signer: signMar } = await getMarketContract();
        const { contract: token, signer: signTok } = await getTokenContract();
        const { contract: nft, signer: signNft } = await getNFTContract()
        await token.connect(signTok).approval("0x56a1bc3578bfa8d881cf2ddf177c0bef62070a11", 1000);
        await nft.connect(signNft).setApprovalForAll("0x56a1bc3578bfa8d881cf2ddf177c0bef62070a11", true);
        await market.connect(signMar).buyNFT(listId);
    };

    async function getAllListings() {
        try {
            const { contract, signer } = await getMarketContract();
            const Market = contract.connect(signer)
            // 获取上架的总数量
            const listingsLength = await Market.listingsLength();
            console.log(`Total listings: ${listingsLength.toString()}`);

            const listings = [];

            // 循环获取每个上架的 NFT 信息
            for (let i = 0; i < listingsLength; i++) {
                const listing = await Market.listings(i);
                listings.push({
                    id: i,
                    seller: listing.seller,
                    nftContract: listing.nftContract,
                    tokenId: listing.tokenId.toString(),
                    price: listing.price.toString(),
                    active: listing.active
                });
            }

            return listings;
        } catch (error) {
            console.error("Error fetching listings:", error);
        }
    }

    function getList() {
        // 调用函数获取所有上架的 NFT
        getAllListings().then((listings) => {
            console.log("All listings:", listings);
            setListings(listings!)
        });
    }


    return (
        <div>
            <Space direction="vertical" style={{ width: '90%', padding: "40px 15%" }}>

                {/* <Input /> */}
                <Input placeholder="ERC721 contract address " value={erc721Addr} onChange={e => setErc721Addr(e.target.value)} />

                <Input placeholder=" tokenid " value={tokenId} onChange={e => setTokenId(e.target.value)} />

                <InputNumber placeholder=" price " style={{ width: "100%" }} value={price} onChange={value => setPrice(value)} />

                <Button type="primary" onClick={listNFT}>上架 NFT</Button>





                <InputNumber placeholder=" listid " style={{ width: "100%" }} value={listId} onChange={value => setListId(value)} />

                <Button type="primary" onClick={buyNFT}>购买 NFT</Button>


                <Button type="primary" onClick={getList}>获取所有上架的 NFT</Button>
                <Table columns={columns} dataSource={listings} />


            </Space>
        </div>
    )
}




