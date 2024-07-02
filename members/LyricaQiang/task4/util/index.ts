import {ethers} from "ethers";
import ERC20Token from "../contract/MyToken";
import ERC721NFT from "../contract/MyNFT";
import NFTMarket from "../contract/MyNFTMarket"

export const tokenAddress = '0xd72B2422d8155f6c712991eDb9ea2944B600F900'
export const NFTAddress = '0xe435F3703f8700161F35D4AbdF9555798fa31976'
export const NFTMarketAddress = '0x4063F92fCf439a4f88dB2D3F33c644af766FCc40'


export const getContract = async (addr: any, abi: any)=> {
    if(window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        let contract = new ethers.Contract(addr, abi, signer);
        return { contract, signer };
    }
    return ''
}


export const getTokenContract = async() => {
    return getContract(tokenAddress, ERC20Token.abi)
}

export const getNFTContract = async() => {
    return getContract(NFTAddress, ERC721NFT.abi)
}

export const getMarketContract = async() => {
    return getContract(NFTMarketAddress, NFTMarket.abi)
}


