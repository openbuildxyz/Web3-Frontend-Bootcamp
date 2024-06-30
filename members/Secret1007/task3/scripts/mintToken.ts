import { ethers } from "hardhat";

// 您的私钥
const privateKey = process.env.ACCOUNT1;
// 合约地址
const tokenAddress = process.env.TOKEN_ADDRESS;
// Provider 
const provider = new ethers.InfuraProvider("sepolia", process.env.INFURA_API_KEY);
async function main() {

    // 使用私钥创建一个新的钱包
    const wallet = new ethers.Wallet(privateKey, provider);

    // 铸造 100 个 Token，按 18 位小数转换为最小单位
    const amount = ethers.parseUnits("100", 18);

    // 获取 MyToken 合约的工厂实例
    const MyToken = await ethers.getContractFactory("MyToken", wallet);
    // 连接到已部署的 MyToken 合约
    const myToken = MyToken.attach(tokenAddress);

    // 调用合约的 mintTo 函数铸造新的 Token
    const tx = await myToken.mintTo(wallet.address, amount);
    console.log("Transaction sent:", tx.hash);

    // 等待交易确认
    await tx.wait();
    console.log("Tokens minted successfully");
}

// 调用 main 函数并处理可能的错误
main()
