import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

// Replace with your own provider, such as Infura or Alchemy
const infuraProjectId = process.env.INFURA_API_KEY || "";
// 连接到以太坊网络
const provider = new ethers.InfuraProvider("sepolia", infuraProjectId);

// Replace with your wallet private key
const privateKey = process.env.PRIVATE_KEY || "";

// Replace with your NFT marketplace contract address
const nftMarketplaceAddress = process.env.NFT_MARKET_ADDRESS || "";

// Replace with the ABI of your NFT marketplace contract
const nftMarketplaceABI = [
    "function listings(uint256) view returns (tuple(address seller, address nftContract, uint256 tokenId, uint256 price))",
    "function buyNFT(uint256 listingId) external",
    "event NFTPurchased(uint256 indexed listingId, address indexed buyer, address indexed nftContract, uint256 tokenId, uint256 price)"
];

// Replace with the ABI of your ERC20 token contract
const erc20TokenABI = ["function approve(address spender, uint256 amount) external returns (bool)",];


// Get the ERC20 token contract address from the marketplace contract
const erc20TokenAddress = process.env.ERC20_TOKEN_ADDRESS || "";

// Define the Listing interface to match the contract structure
interface Listing {
    seller: string;
    nftContract: string;
    tokenId: number;
    price: ethers.BigNumberish;
}

// Initialize wallet and contract instances
const wallet = new ethers.Wallet(privateKey, provider);
const nftMarketplaceContract = new ethers.Contract(nftMarketplaceAddress, nftMarketplaceABI, wallet);


async function buyNFT(listingId: number): Promise<void> {
    try {
        // Check the listing details
        const listing: Listing = await nftMarketplaceContract.listings(listingId);
        console.log("Listing details:", listing);
        if (!listing.price) {
            console.error("NFT not listed for sale");
            return;
        }

        // Create an instance of the ERC20 token contract
        const erc20TokenContract = new ethers.Contract(erc20TokenAddress, erc20TokenABI, wallet);
        // Approve the marketplace to spend the required ERC20 tokens
        const approveTx = await erc20TokenContract.approve(nftMarketplaceAddress, listing.price);
        await approveTx.wait();
        console.log("ERC20 token approval transaction confirmed");

        // Call the buyNFT function
        const buyTx = await nftMarketplaceContract.buyNFT(listingId);
        await buyTx.wait();
        console.log("NFT purchase transaction confirmed");
    } catch (error) {
        console.error("Error buying NFT:", error);
    }
}

// Replace with the listing ID you want to buy
const listingId = 1;

buyNFT(listingId);
