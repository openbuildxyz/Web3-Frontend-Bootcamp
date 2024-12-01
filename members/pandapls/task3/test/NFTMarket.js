const {
  loadFixture,
} = require('@nomicfoundation/hardhat-toolbox/network-helpers');
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('NFTMarket', function () {
  const tokenId = 0;
  const nftPrice = ethers.parseEther('10');
  async function deployNFTMarketFixture() {
    const [owner, seller, buyer] = await ethers.getSigners();
    // 部署erc20 代币合约
    const myTokenFactory = await ethers.getContractFactory('MyToken');
    const myToken = await myTokenFactory.deploy(ethers.parseEther('10000'));
    const myTokenAddress = await myToken.getAddress();

    // 部署NFT token合约
    const myNFTTokenFactory = await ethers.getContractFactory('MyNFTToken');
    const myNFTToken = await myNFTTokenFactory.deploy();
    const myNFTTokenAddress = await myNFTToken.getAddress();

    // 部署NFTMarket合约
    const NFTMarketFactory = await ethers.getContractFactory('NFTMarket');
    const NFTMarket = await NFTMarketFactory.deploy(myTokenAddress);
    const NFTMarketAddress = await NFTMarket.getAddress();

    console.log(`mytokenAddress: ${myTokenAddress}`);
    console.log(`myNFTTokenAddress: ${myNFTTokenAddress}`);
    console.log(`NFTMarketAddress: ${NFTMarketAddress}`);

    // 给卖家铸造一个 NFT
    await myNFTToken.connect(seller).mint({ from: seller.address });
    return {
      owner,
      seller,
      buyer,
      myToken,
      myTokenAddress,
      myNFTToken,
      myNFTTokenAddress,
      NFTMarket,
      NFTMarketAddress,
    };
  }

  describe('Deployment', function () {
    it('应正确部署市场并设置代币地址', async function () {
      const { myTokenAddress, NFTMarket } = await loadFixture(
        deployNFTMarketFixture
      );

      expect(await NFTMarket.token()).to.equal(myTokenAddress); // 检查市场合约的代币地址是否正确
    });

    it('应允许卖家铸造 NFT', async function () {
      const { myNFTToken, seller } = await loadFixture(deployNFTMarketFixture);
      expect(await myNFTToken.ownerOf(tokenId)).to.equal(seller.address); // 检查 NFT 的拥有者是否为卖家
    });
  });

  describe('Listings', function () {
    describe('Validations', function () {
      it('如果 NFT 未获批准给市场应返回错误', async function () {
        const { NFTMarket, NFTMarketAddress, myNFTToken, myNFTTokenAddress, seller } = await loadFixture(
          deployNFTMarketFixture
        );
        await myNFTToken.connect(seller).setApprovalForAll(NFTMarketAddress, false);
        await expect(
          NFTMarket.connect(seller).listNFT(
            myNFTTokenAddress,
            tokenId,
            ethers.parseEther('10')
          )
        ).to.be.revertedWith('the contract not be approved'); // 验证返回错误信息
      });
    });

    it('应允许卖家上架 NFT', async function () {
      const {
        NFTMarket,
        NFTMarketAddress,
        myNFTToken,
        myNFTTokenAddress,
        seller,
      } = await loadFixture(deployNFTMarketFixture);

      // 卖家批准市场合约转移 NFT
      await myNFTToken
        .connect(seller)
        .setApprovalForAll(NFTMarketAddress, true);

      // 卖家上架 NFT
      await NFTMarket.connect(seller).listNFT(
        myNFTTokenAddress,
        tokenId,
        nftPrice
      );

      // 检查 NFT 是否正确上架
      const listedItems = await NFTMarket.getAllNFTItems(myNFTTokenAddress);
      expect(listedItems.length).to.equal(1); // 确保上架数量为 1
      expect(listedItems[0].nftContract).to.equal(myNFTTokenAddress); // 检查合约地址
      expect(listedItems[0].tokenId).to.equal(tokenId); // 检查 NFT ID
      expect(listedItems[0].seller).to.equal(seller.address); // 检查卖家地址
      expect(listedItems[0].price).to.equal(nftPrice); // 检查价格
    });
  });
  describe('Purchases', function () {
    it('应允许买家购买 NFT', async function () {
      const {
        NFTMarket,
        NFTMarketAddress,
        myToken,
        myNFTToken,
        myNFTTokenAddress,
        seller,
        buyer,
      } = await loadFixture(deployNFTMarketFixture);

      // 卖家批准市场合约转移 NFT
      await myNFTToken
        .connect(seller)
        .setApprovalForAll(NFTMarketAddress, true);
      await NFTMarket.connect(seller).listNFT(
        myNFTTokenAddress,
        tokenId,
        nftPrice
      );

      // 买家分配足够的 ERC20 代币并批准支付
      await myToken.transfer(buyer.address, nftPrice);
      await myToken.connect(buyer).approve(NFTMarketAddress, nftPrice);

      // 买家购买 NFT
      await NFTMarket.connect(buyer).purchaseNFT(myNFTTokenAddress, tokenId);

      // 检查 NFT 的新拥有者是否为买家
      expect(await myNFTToken.ownerOf(tokenId)).to.equal(buyer.address); // 确认 NFT 拥有者为买家
    });
  });
});
