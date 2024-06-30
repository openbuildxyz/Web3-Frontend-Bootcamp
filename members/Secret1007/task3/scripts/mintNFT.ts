import { ethers } from "hardhat";

// Provider
const provider = new ethers.InfuraProvider("sepolia", process.env.INFURA_API_KEY);

// Account and wallet
const accountPrivateKey = process.env.ACCOUNT2 || "";
const wallet = new ethers.Wallet(accountPrivateKey, provider);

// Contract details
const nftAddress = process.env.NFT_ADDRESS || "";
const tokenAddress = process.env.TOKEN_ADDRESS || ""; // Your ERC-20 token address
const tokenABI = [
    "function approve(address spender, uint256 amount) public returns (bool)"
];
const contractABI = [
    "function mintNFT(string memory tokenURI) public returns (uint256)",
    "function getCurrentTokenId() public view returns (uint256)"
];

const tokenURI = "ipfs://QmVuwFL2LXjcp2pvcez6membFs7teUb7fhwjKrGwJ1pJVz";

// Create contract instances
const nftContract = new ethers.Contract(nftAddress, contractABI, wallet);
const tokenContract = new ethers.Contract(tokenAddress, tokenABI, wallet);

async function mintNFT() {
    try {
        // Approve tokens for NFT contract
        const amount = ethers.parseUnits('50', 18); // Replace with the required amount
        const approveTx = await tokenContract.approve(nftAddress, amount);
        console.log("Approval transaction sent: ", approveTx.hash);
        await approveTx.wait();
        console.log("Approval transaction confirmed");

        // Mint the NFT
        const mintTx = await nftContract.mintNFT(tokenURI);
        console.log("Mint transaction sent: ", mintTx.hash);
        const receipt = await mintTx.wait();

        // Get the new token ID
        const currentTokenId = await nftContract.getCurrentTokenId();
        console.log("New Token ID: ", currentTokenId.toString());
    } catch (error) {
        console.error("Error minting NFT:", error);
    }
}

mintNFT();
