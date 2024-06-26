import { ethers } from "ethers";
import dotenv from 'dotenv';
import ZZTokenArtifact from '../ignition/deployments/chain-11155111/artifacts/ZZTokenModule#ZZToken.json';
import ZZNFTArtifact from '../ignition/deployments/chain-11155111/artifacts/ZZNFTModule#ZZNFT.json';
import ZZNFTMarketArtifact from '../ignition/deployments/chain-11155111/artifacts/ZZNFTMarketModule#ZZNFTMarket.json';

dotenv.config();

const  RPC_URL = process.env.RPC_URI || '';
const  PRIVATE_KEY =  process.env.PRIVATE_KEY || '';
const  TOKEN_CONTRACT = process.env.TOKEN_CONTRACT || '';
const  NFT_CONTRACT = process.env.NFT_CONTRACT || '';
const  NFTMARKET_CONTRACT = process.env.NFTMARKET_CONTRACT || '';

// 合约地址（从部署输出中获取）
const zzTokenContrctAddress: string = TOKEN_CONTRACT;
const nftContractAddress: string =  NFT_CONTRACT;
const nftMarketContractAddress: string = NFTMARKET_CONTRACT;

// 初始化 ethers
const provider = new ethers.JsonRpcProvider(RPC_URL);

// 设置签名者（使用私钥连接到网络）
const privateKey: string = PRIVATE_KEY;
if (!privateKey) {
  throw new Error('Private key not found in environment variables');
}
const signer: ethers.Wallet = new ethers.Wallet(privateKey, provider);

const buyerAddress = process.env.BUYER_ADDRESS || ''
const buyerKey = process.env.BUYER_PRIVATE_KEY || '';
const buyer: ethers.Wallet = new ethers.Wallet(buyerKey, provider);

// 使用最新的 ABI 和合约地址创建合约实例
const zzTokenContract: ethers.Contract = new ethers.Contract(
  zzTokenContrctAddress,
  ZZTokenArtifact.abi,
  signer
);
const zzNFTContract: ethers.Contract = new ethers.Contract(
  nftContractAddress,
  ZZNFTArtifact.abi,
  signer
);
const zzNFTMarketContract: ethers.Contract = new ethers.Contract(
  nftMarketContractAddress,
  ZZNFTMarketArtifact.abi,
  signer
);
const buyTokenContract: ethers.Contract = new ethers.Contract(
  zzTokenContrctAddress,
  ZZTokenArtifact.abi,
  buyer
);
const buyNFTMarketContract: ethers.Contract = new ethers.Contract(
  nftMarketContractAddress,
  ZZNFTMarketArtifact.abi,
  buyer
);


async function transfer() {
      // 转帐 Token
    const tx = await zzTokenContract.transfer(buyerAddress,10000);
    const receipt = await tx.wait();
    console.log("Token Transfer. Transaction Hash:", receipt.hash);
}

async function mintNFT(): Promise<number> {
  // 创建 NFT
    const tx = await zzNFTContract.mintNFT(signer.address, "https://img.zworker.top/file/0bb43c4f6d9ddedd2cadf.jpg");
    const receipt = await tx.wait();
    console.log("NFT Minted. Transaction Hash:", receipt.hash);

    // // 解析事件（示例）
    let tokenId: number = 0;
    for (const log of receipt.logs) {
      const parsedLog = zzNFTContract.interface.parseLog(log);
      if (parsedLog?.name === "NFTMinted") {
        const { owner, itemId, itemURI } = parsedLog.args;
        console.log(`NFTMinted: owner=${owner}, itemId=${itemId}, itemURI=${itemURI}`);
        console.log("Token URI:", await zzNFTContract.tokenURI(itemId));
        tokenId = itemId;
      }
    }
    return tokenId;
}

async function listNFT(tokenId: number) {

  let tx = await zzNFTContract.setApprovalForAll(nftMarketContractAddress, true);
  await tx.wait();
  console.log("Approval for NFTMarket set.");

  // let nonce = await provider.getTransactionCount(signer.address);
  // // 上架 NFT
  tx = await zzNFTMarketContract.listNFT(nftContractAddress, tokenId, 10);
  let receipt = await tx.wait();
  console.log("NFT Listed. Transaction Hash:", receipt.hash);
  
}

async function buyNFT(tokenId: number){
      // 购买 NFT（示例，需要根据实际情况调整）
    // buyer 购买 token
    
     // 查询余额
     const balance = await buyTokenContract.balanceOf(buyerAddress);
     // 将余额转换为 
 
     console.log(`Balance of ${buyerAddress}: ${balance} 个 ERC20 代币`);

         // 调用 approve 方法，允许 NFTMarket 用 10000 的额度
    let tx = await buyTokenContract.approve(await buyNFTMarketContract.getAddress(), 10000);
    let receipt = await tx.wait();
    console.log("Approval transaction hash:", receipt.hash);

    tx = await buyNFTMarketContract.buyNFT(tokenId);
    receipt = await tx.wait();
    console.log("NFT Purchased. Transaction Hash:", receipt.hash);
}

// 主函数
async function main(): Promise<void> {
  try {

    //mintNFT
    // const nftId = await mintNFT();

    // //listNFT
    // await listNFT(nftId);

    // //充值
    // await transfer();
    //buyNFT
    await buyNFT(1);

  } catch (error: any) {
    console.log("ERROR:", error);
    process.exitCode = 1;
  }
}

main();