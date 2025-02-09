const { expect } = require("chai");
const { ethers } = require("hardhat");
const { parseEther } = ethers;

describe("NFTMarket", function () {
  let nftMarket;
  let myNFT;
  let myToken;
  let owner;
  let buyer;
  let seller;
  const TOKEN_ID = 0;
  const PRICE = parseEther("1.0");

  beforeEach(async function () {
    [owner, seller, buyer] = await ethers.getSigners();

    // 部署 NFT 合约
    const MyNFT = await ethers.getContractFactory("MyNFT");
    myNFT = await MyNFT.deploy();
    await myNFT.waitForDeployment();
    const nftAddress = await myNFT.getAddress();  // 获取合约地址

    // 部署 ERC20 合约
    const MyToken = await ethers.getContractFactory("MyToken");
    myToken = await MyToken.deploy(parseEther("10000"));
    await myToken.waitForDeployment();
    const tokenAddress = await myToken.getAddress();  // 获取合约地址

    // 转移一些代币给买家
    await myToken.transfer(buyer.address, parseEther("2.0"));

    // 部署市场合约
    const NFTMarket = await ethers.getContractFactory("NFTMarket");
    nftMarket = await NFTMarket.deploy();
    await nftMarket.waitForDeployment();
    const marketAddress = await nftMarket.getAddress();  // 获取合约地址

    // 铸造 NFT 给 seller
    await myNFT.mint(seller.address, "ipfs://test");
    
    // seller 授权市场合约
    await myNFT.connect(seller).setApprovalForAll(marketAddress, true);
    
    // buyer 授权 ERC20
    await myToken.connect(buyer).approve(marketAddress, PRICE);
  });

  describe("上架商品", function () {
    it("应该能够正确上架 NFT", async function () {
      const nftAddress = await myNFT.getAddress();
      const tokenAddress = await myToken.getAddress();

      await nftMarket.connect(seller).listNFT(
        nftAddress,
        TOKEN_ID, 
        PRICE,
        tokenAddress
      );
      
      const listing = await nftMarket.listings(nftAddress, TOKEN_ID);
      expect(listing.seller).to.equal(seller.address);
      expect(listing.price).to.equal(PRICE);
      expect(listing.erc20Token).to.equal(tokenAddress);
    });

    it("非 NFT 拥有者不能上架", async function () {
      const nftAddress = await myNFT.getAddress();
      const tokenAddress = await myToken.getAddress();

      await expect(
        nftMarket.connect(buyer).listNFT(
          nftAddress,
          TOKEN_ID, 
          PRICE,
          tokenAddress
        )
      ).to.be.reverted;
    });
  });

  describe("购买商品", function () {
    beforeEach(async function () {
      const nftAddress = await myNFT.getAddress();
      const tokenAddress = await myToken.getAddress();

      await nftMarket.connect(seller).listNFT(
        nftAddress,
        TOKEN_ID, 
        PRICE,
        tokenAddress
      );
    });

    it("应该能够正确购买 NFT", async function () {
      const nftAddress = await myNFT.getAddress();
      await nftMarket.connect(buyer).buyNFT(nftAddress, TOKEN_ID);

      expect(await myNFT.ownerOf(TOKEN_ID)).to.equal(buyer.address);
      
      const listing = await nftMarket.listings(nftAddress, TOKEN_ID);
      expect(listing.seller).to.equal(ethers.ZeroAddress);
    });

    it("没有足够代币时不能购买", async function () {
      const nftAddress = await myNFT.getAddress();
      const poorBuyer = await ethers.provider.getSigner(3);
      await expect(
        nftMarket.connect(poorBuyer).buyNFT(nftAddress, TOKEN_ID)
      ).to.be.reverted;
    });
  });
});
