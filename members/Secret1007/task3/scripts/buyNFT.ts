import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

const infuraProjectId = process.env.INFURA_API_KEY || "";
const provider = new ethers.InfuraProvider("sepolia", infuraProjectId);

const privateKey = process.env.PRIVATE_KEY || "";
const nftMarketplaceAddress = process.env.NFT_MARKET_ADDRESS || "";

const nftMarketplaceABI = [
    "function listings(uint256) view returns (tuple(address seller, address nftContract, uint256 tokenId, uint256 price))",
    "function buyNFT(uint256 listingId) external",
    "event NFTPurchased(uint256 indexed listingId, address indexed buyer, address indexed nftContract, uint256 tokenId, uint256 price)",
];

const erc20TokenABI = [
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function balanceOf(address owner) view returns (uint256)",
    "function allowance(address owner, address spender) view returns (uint256)",
];

const erc20TokenAddress = process.env.ERC20_TOKEN_ADDRESS || "";

interface Listing {
    seller: string;
    nftContract: string;
    tokenId: number;
    price: ethers.BigNumberish;
}

const wallet = new ethers.Wallet(privateKey, provider);
const nftMarketplaceContract = new ethers.Contract(nftMarketplaceAddress, nftMarketplaceABI, wallet);
const buyer = process.env.BUYER_PRIVATE || "";
const buyerWallet = new ethers.Wallet(buyer, provider);

async function checkBalance(address: string, tokenAddress: string): Promise<void> {
    const balance = await provider.getBalance(address);
    console.log(`ETH Balance: ${ethers.formatEther(balance)} ETH`);

    const erc20TokenContract = new ethers.Contract(tokenAddress, erc20TokenABI, provider);
    const tokenBalance = await erc20TokenContract.balanceOf(address);
    console.log(`Token Balance: ${ethers.formatUnits(tokenBalance, 18)} Tokens`);
}

async function checkAllowance(owner: string, spender: string, tokenAddress: string): Promise<void> {
    const erc20TokenContract = new ethers.Contract(tokenAddress, erc20TokenABI, provider);
    const allowance = await erc20TokenContract.allowance(owner, spender);
    console.log(`Allowance: ${ethers.formatUnits(allowance, 18)} Tokens`);
}

async function buyNFT(listingId: number): Promise<void> {
    try {
        const listing = await nftMarketplaceContract.listings(listingId);
        console.log("Listing details:", listing);
        if (!listing.price) {
            console.error("NFT not listed for sale");
            return;
        }

        await checkBalance(wallet.address, erc20TokenAddress);
        await checkAllowance(wallet.address, nftMarketplaceAddress, erc20TokenAddress);

        const erc20TokenContract = new ethers.Contract(erc20TokenAddress, erc20TokenABI, wallet);

        // Approve the marketplace to spend the required ERC20 tokens (price of the NFT)
        const approveTx = await erc20TokenContract.approve(nftMarketplaceAddress, listing.price);
        await approveTx.wait();
        console.log("ERC20 token approval transaction confirmed");

        const buyTx = await nftMarketplaceContract.buyNFT(listingId);
        await buyTx.wait();
        console.log("NFT purchase transaction confirmed");
    } catch (error) {
        console.error("Error buying NFT:", error);
    }
}

const listingId = 1;

buyNFT(listingId);
