export interface INFTItem {
    nftContract: string;
    tokenId: bigint;
    seller: string;
    price: bigint;
    addTime: bigint;
    isActive: boolean;
}

export interface IAddNFTParams {
    nftContract: string;
    tokenId: string;
    price: string;
}
