import { ethers } from "hardhat";
// 导入 ethers.js 库
async function main() {
    // 目标合约地址
    const contractAddress = "0xb903BDB59845d586544D85C984b620bf64eb8683";
    // 您的账户地址
    const account = "0x6992663798a664a8cBc3C93b56483C281C1E8438";
    // 铸造 100 个 Token，按 18 位小数转换为最小单位
    const amount = ethers.parseUnits("100", 18);

    // 获取 MyToken 合约的工厂实例
    const MyToken = await ethers.getContractFactory("MyToken");
    // 连接到已部署的 MyToken 合约
    const myToken = MyToken.attach(contractAddress);

    // 调用合约的 mintTo 函数铸造新的 Token
    const tx = await myToken.mintTo(account, amount);
    console.log("Transaction sent:", tx.hash);

    // 等待交易确认
    await tx.wait();
    console.log("Tokens minted successfully");
}

// 调用 main 函数并处理可能的错误
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
