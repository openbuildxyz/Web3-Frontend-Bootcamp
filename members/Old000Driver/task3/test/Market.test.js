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

  describe("下架商品", function () {
    beforeEach(async function () {
      const nftAddress = await myNFT.getAddress();
      const tokenAddress = await myToken.getAddress();
      
      // 先上架一个NFT
      await nftMarket.connect(seller).listNFT(
        nftAddress,
        TOKEN_ID, 
        PRICE,
        tokenAddress
      );
    });

    it("卖家应该能够下架NFT", async function () {
      const nftAddress = await myNFT.getAddress();
      
      await expect(nftMarket.connect(seller).delistNFT(nftAddress, TOKEN_ID))
        .to.emit(nftMarket, "ItemDelisted")
        .withArgs(seller.address, nftAddress, TOKEN_ID);

      // 验证NFT已返还给卖家
      expect(await myNFT.ownerOf(TOKEN_ID)).to.equal(seller.address);
      
      // 验证listing已被删除
      const listing = await nftMarket.listings(nftAddress, TOKEN_ID);
      expect(listing.price).to.equal(0);
    });

    it("非卖家不能下架NFT", async function () {
      const nftAddress = await myNFT.getAddress();
      await expect(
        nftMarket.connect(buyer).delistNFT(nftAddress, TOKEN_ID)
      ).to.be.revertedWith("Not the seller");
    });
  });

  describe("查询功能", function () {
    const TOKEN_ID_2 = 1;
    beforeEach(async function () {
      const nftAddress = await myNFT.getAddress();
      const tokenAddress = await myToken.getAddress();

      // 铸造第二个NFT
      await myNFT.mint(seller.address, "ipfs://test2");
      
      // 上架两个NFT
      await nftMarket.connect(seller).listNFT(
        nftAddress,
        TOKEN_ID,
        PRICE,
        tokenAddress
      );
      await nftMarket.connect(seller).listNFT(
        nftAddress,
        TOKEN_ID_2,
        parseEther("2.0"),
        tokenAddress
      );
    });

    it("应该能正确获取上架信息", async function () {
      const nftAddress = await myNFT.getAddress();
      const tokenAddress = await myToken.getAddress();
      
      const listing = await nftMarket.getListing(nftAddress, TOKEN_ID);
      expect(listing.seller).to.equal(seller.address);
      expect(listing.price).to.equal(PRICE);
      expect(listing.erc20Token).to.equal(tokenAddress);
    });

    it("应该正确判断NFT是否上架", async function () {
      const nftAddress = await myNFT.getAddress();
      
      expect(await nftMarket.isListed(nftAddress, TOKEN_ID)).to.be.true;
      expect(await nftMarket.isListed(nftAddress, 999)).to.be.false;
    });

    it("应该能正确获取所有上架的NFT信息", async function () {
      const nftAddress = await myNFT.getAddress();
      const tokenAddress = await myToken.getAddress();
      
      const [items, sellers, prices, erc20Tokens] = await nftMarket.getAllListedNFTs();
      
      // 验证返回的数组长度
      expect(items.length).to.equal(2);
      expect(sellers.length).to.equal(2);
      expect(prices.length).to.equal(2);
      expect(erc20Tokens.length).to.equal(2);
      
      // 验证第一个NFT的信息
      expect(items[0].nftContract).to.equal(nftAddress);
      expect(items[0].tokenId).to.equal(TOKEN_ID);
      expect(sellers[0]).to.equal(seller.address);
      expect(prices[0]).to.equal(PRICE);
      expect(erc20Tokens[0]).to.equal(tokenAddress);
      
      // 验证第二个NFT的信息
      expect(items[1].nftContract).to.equal(nftAddress);
      expect(items[1].tokenId).to.equal(TOKEN_ID_2);
      expect(sellers[1]).to.equal(seller.address);
      expect(prices[1]).to.equal(parseEther("2.0"));
      expect(erc20Tokens[1]).to.equal(tokenAddress);
    });

    it("应该能正确获取上架NFT的总数", async function () {
      expect(await nftMarket.getListedNFTCount()).to.equal(2);
      
      // 下架一个NFT后，总数应该减少
      const nftAddress = await myNFT.getAddress();
      await nftMarket.connect(seller).delistNFT(nftAddress, TOKEN_ID);
      expect(await nftMarket.getListedNFTCount()).to.equal(1);
    });

    it("购买NFT后应该从列表中移除", async function () {
      const nftAddress = await myNFT.getAddress();
      await nftMarket.connect(buyer).buyNFT(nftAddress, TOKEN_ID);
      
      const [items] = await nftMarket.getAllListedNFTs();
      expect(items.length).to.equal(1);
      expect(items[0].tokenId).to.equal(TOKEN_ID_2);
    });
  });
});
