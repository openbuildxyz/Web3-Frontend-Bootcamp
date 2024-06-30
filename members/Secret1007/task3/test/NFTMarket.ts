import { expect } from "chai";
import { ethers } from "hardhat";

describe("NFTMarket", async () => {

  // 获取合约实例和签名者
  //  owner 作为部署者 addr1 addr2 其他账号
  const [owner, addr1, addr2] = await ethers.getSigners();


  // 部署 MyToken 合约
  const MyToken = await ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy(); // 确保 myToken 被正确赋值
  myToken.mintTo(owner, ethers.parseEther("100"));
  const tokenAddress = await myToken.getAddress()

  // 部署 MyNFT 合约
  const MyNFT = await ethers.getContractFactory("MyNFT");
  const myNFT = await MyNFT.deploy();
  const NFTAddress = await myNFT.getAddress()

  // 部署 NFTMarket 合约
  const NFTMarket = await ethers.getContractFactory("NFTMarket");
  const nftMarket = await NFTMarket.deploy(tokenAddress);
  const nftMarketAddress =await nftMarket.getAddress()

  describe("Listing and Buying NFTs", function () {
    it("Should allow a user to list and buy an NFT", async function () {
      // 铸造一个新的 NFT
      await myNFT.connect(addr1).mintNFT(addr1, "tokenURI");
      expect(await myNFT.ownerOf(1)).to.equal(await addr1.getAddress());

      // 批准市场合约转移 NFT
      await myNFT.connect(addr1).approve(nftMarketAddress, 1);

      // 列出 NFT
      await nftMarket.connect(addr1).listNFT(NFTAddress, 1, ethers.parseUnits("10", 18));
      expect(await myNFT.ownerOf(1)).to.equal(nftMarketAddress);

      // 转移 MyToken 到 addr2
      await myToken.connect(owner).transfer(await addr2.getAddress(), ethers.parseUnits("10", 18));
      await myToken.connect(addr2).approve(nftMarketAddress, ethers.parseUnits("10", 18));

      // 购买 NFT
      await nftMarket.connect(addr2).buyNFT(1);
      expect(await myNFT.ownerOf(1)).to.equal(await addr2.getAddress());
    });
  });
});
