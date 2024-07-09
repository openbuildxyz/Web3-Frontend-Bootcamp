/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('NFTMarket', () => {
  let _NFT721;
  let _erc20Token;
  let _NFTMarket;
  let signers;

  // check for method from ethers
  // console.log('ethers', ethers);
  before(async () => {
    // Deploy the NFTMarket contract
    const NFT721 = await ethers.getContractFactory('NFTM');
    const erc20Token = await ethers.getContractFactory('SadMonkey');
    const NFTMarket = await ethers.getContractFactory('Market');

    signers = await ethers.getSigners();
    const currentSignersAddress = await signers[0].getAddress();

    _NFT721 = await NFT721.deploy(currentSignersAddress);
    _erc20Token = await erc20Token.deploy();
    _NFTMarket = await NFTMarket.deploy(_erc20Token.address, _NFT721.address);
  });

  // const createNFT = async (tokenURI) => {
  //   const transaction = await _NFT721.safeMint(tokenURI);
  //   const receipt = await transaction.wait();
  //   const tokenID = receipt.events[0].args.tokenId;
  //   return tokenID;
  // };

  describe('Deployment', function () {
    it('Should track name and symbol of the nft collection', async function () {
      // This test expects the owner variable stored in the contract to be equal
      // to our Signer's owner.
      const nftName = "lin's erc21";
      const nftSymbol = 'SadMonkey';
      expect(await _NFT721.name()).to.equal(nftName);
      expect(await _NFT721.symbol()).to.equal(nftSymbol);
    });
  });

  describe('createNFT', function () {
    it('should create an NFT with the correct owner and tokenURI', async function () {
      const tokenURI = 'https://some-token.uri/';
      const transaction = await _NFT721.safeMint(tokenURI);
      const receipt = await transaction.wait();
      // if event
      //  const tokenID = receipt.events[0].args.tokenId;
      const tokenID = 0;
      // Assert that the newly created NFT's token uri is the same one sent to the createNFT function
      const mintedTokenURI = await _NFT721.tokenURI(tokenID);
      expect(mintedTokenURI).to.equal(tokenURI);
    });
  });

  describe('listNFT', () => {
    const tokenURI = 'some token uri';
    it('should revert if price is zero', async () => {
      const transaction = await _NFT721.safeMint(tokenURI);
      const receipt = await transaction.wait();
      // token id 可以用户传 ，也可以我们存储之后代码传，这里实现的是用户传
      const tokenID = 0;
      const transaction2 = _NFTMarket.listNFT(tokenID, 0);
      await expect(transaction2).to.be.revertedWith(
        'price must be greater than 0'
      );
    });

    it('should revert if not called by the owner', async () => {
      // const tokenID = await createNFT(tokenURI);
      const tokenID = 1;
      const transaction = _NFTMarket.connect(signers[1]).listNFT(tokenID, 12);
      await expect(transaction).to.be.revertedWith('Not the owner');
    });

    it('should list the token for sale if all requirements are met', async () => {
      const price = 123;
      const tokenID = 0;
      const transaction = await _NFT721.safeMint(tokenURI);
      await transaction.wait();
      const transaction2 = await _NFT721.setApprovalForAll(
        _NFTMarket.address,
        true
      );
      await transaction2.wait();

      const transaction3 = await _NFTMarket.listNFT(tokenID, price);
      const receipt = await transaction3.wait();
      // Ownership should be transferred to the contract
      const ownerAddress = await _NFT721.ownerOf(tokenID);
      expect(ownerAddress).to.equal(_NFTMarket.address);
      // NFTTransfer event should have the right args
      console.log('receipt.events', receipt.events[1].args); // 可以拿到event的参数
      const args = receipt.events[1].args;
      expect(args.tokenID).to.equal(tokenID);
      expect(args.from).to.equal(signers[0].address);
      expect(args.to).to.equal(_NFTMarket.address);
      expect(args.tokenURI).to.equal('');
      expect(args.price).to.equal(price);
    });
  });
});
