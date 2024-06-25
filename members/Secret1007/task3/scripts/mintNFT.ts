import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

// Replace with your contract address
const contractAddress = process.env.NFT_CONTRACT_ADDRESS || "";

// Replace with your contract ABI
const contractABI = ["function mintNFT(address recipient, string tokenURI) public returns (uint256)", "function getCurrentTokenId() public view returns (uint256)"];

// Replace with your recipient address and token URI
const recipientAddress = "RECIPIENT_ADDRESS_HERE";
const tokenURI = "SECRET_TOKEN_URI_HERE";

// Replace with your provider URL (e.g., Infura, Alchemy)
const provider = new ethers.JsonRpcProvider("YOUR_PROVIDER_URL_HERE");

// Replace with your private key
const privateKey = "YOUR_PRIVATE_KEY_HERE";
const wallet = new ethers.Wallet(privateKey, provider);

// Create a contract instance
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

async function mintNFT() {
    try {
        // Estimate gas limit
        const gasLimit = await contract.estimateGas.mintNFT(recipientAddress, tokenURI);

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
