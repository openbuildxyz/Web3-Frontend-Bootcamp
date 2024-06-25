import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

// 环境变量
const privateKey = process.env.PRIVATE_KEY || "";
const infuraProjectId = process.env.INFURA_API_KEY || "";
const nftMarketAddress = process.env.NFT_MARKET_ADDRESS || "";
const nftContractAddress = process.env.NFT_CONTRACT_ADDRESS || "";
const erc20TokenAddress = process.env.ERC20_TOKEN_ADDRESS || "";

async function listNFT() {
    // 连接到以太坊网络
    const provider = new ethers.InfuraProvider("sepolia", infuraProjectId);
    const wallet = new ethers.Wallet(privateKey, provider);

    // NFTMarket 合约 ABI
    const nftMarketABI = ["function listNFT(address nftContract, uint256 tokenId, uint256 price) external"];
    const nftMarketContract = new ethers.Contract(nftMarketAddress, nftMarketABI, wallet);

    // NFT 合约 ABI
    const nftABI = ["function approve(address to, uint256 tokenId) external"];
    const nftContract = new ethers.Contract(nftContractAddress, nftABI, wallet);

    const tokenId = 1; // 你要上架的 NFT ID
    const price = ethers.parseUnits("1.0", 18); // NFT 价格 (例如 1 ERC20 代币)

    try {
        console.log("Listing NFT...", nftContract);
        // 先授权 NFTMarket 合约可以转移你的 NFT
        const approveTx = await nftContract.approve(nftMarketAddress, tokenId);
        console.log("Approve transaction hash:", approveTx.hash);
        await approveTx.wait();

        // // 上架 NFT
        // const listTx = await nftMarketContract.listNFT(nftContractAddress, tokenId, price);
        // console.log("List transaction hash:", listTx.hash);
        // await listTx.wait();
        // console.log("NFT listed successfully!");
    } catch (error) {
        console.error("Error listing NFT:", error);
    }
}

listNFT();
