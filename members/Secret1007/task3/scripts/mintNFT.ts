import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

const contractAddress = process.env.NFT_CONTRACT_ADDRESS || "";
const infuraProjectId = "https://eth-sepolia-public.unifra.io";
const privateKey = process.env.PRIVATE_KEY || "";

const contractABI = ["function mintNFT(address recipient, string tokenURI) public returns (uint256)", "function getCurrentTokenId() public view returns (uint256)"];

const recipientAddress = "0x6992663798a664a8cBc3C93b56483C281C1E8438";
const tokenURI = "ipfs://QmVuwFL2LXjcp2pvcez6membFs7teUb7fhwjKrGwJ1pJVz";

// Replace with your provider URL (e.g., Infura, Alchemy)
const provider = new ethers.JsonRpcProvider(infuraProjectId);

// Replace with your private key
const wallet = new ethers.Wallet(privateKey, provider);

// Create a contract instance
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

async function mintNFT() {
    try {
        // Estimate gas limit
        const mintNFTInfo = await contract.mintNFT(recipientAddress, tokenURI);

        // // Mint the NFT
        const tx = await contract.mintNFT(recipientAddress, tokenURI, { gasLimit: mintNFTInfo.gasLimit });
        console.log("Transaction sent: ", tx.hash);

        // Wait for the transaction to be mined
        const receipt = await tx.wait();
        console.log("Transaction mined: ", receipt.transactionHash);

        // Get the new token ID
        const currentTokenId = await contract.getCurrentTokenId();
        console.log("New Token ID: ", currentTokenId.toString());
    } catch (error) {
        console.error("Error minting NFT: ", error);
    }
}

mintNFT();
