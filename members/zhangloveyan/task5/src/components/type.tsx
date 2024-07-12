// 合约里面的数据
export type NFTItem = {
    seller: string;
    nftContract: string;
    tokenId: number;
    price: number;
    isActive: boolean;
    listTime: number;
}

// 页面渲染的数据
export type NFTAllItem = {
    tokenId: number;
    nftContract: string;
    seller: string;
    listTime: string;
    pic: string;
    price: number;
    isActive: boolean;
}