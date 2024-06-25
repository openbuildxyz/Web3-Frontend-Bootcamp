import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

// Replace with your contract address
const contractAddress = process.env.NFT_CONTRACT_ADDRESS || "";
const infuraProjectId = process.env.INFURA_API_KEY || "";
const privateKey = process.env.PRIVATE_KEY || "";

// Replace with your contract ABI
const contractABI = ["function mintNFT(address recipient, string tokenURI) public returns (uint256)", "function getCurrentTokenId() public view returns (uint256)"];

// Replace with your recipient address and token URI
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
        const gasLimit = await contract.mintNFT(recipientAddress, tokenURI);

        // Mint the NFT
        const tx = await contract.mintNFT(recipientAddress, tokenURI, { gasLimit });
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
