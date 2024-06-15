const MyToken = artifacts.require("MyToken");
const MyNFT = artifacts.require("MyNFT");
const NFTMarket = artifacts.require("NFTMarket");

contract("MyToken", accounts => {
  it("should put 1000000 MyToken in the first account", async () => {
    const myTokenInstance = await MyToken.deployed();
    const balance = await myTokenInstance.balanceOf(accounts[0]);
    assert.equal(balance.valueOf(), 1000000, "1000000 wasn't in the first account");
  });
});

contract("MyNFT", accounts => {
  it("should mint a new NFT", async () => {
    const myNFTInstance = await MyNFT.deployed();
    await myNFTInstance.mint(accounts[0]);
    const owner = await myNFTInstance.ownerOf(0);
    assert.equal(owner, accounts[0], "The owner of the NFT should be the first account");
  });
});

contract("NFTMarket", accounts => {
  it("should be able to list and buy an NFT", async () => {
    const myTokenInstance = await MyToken.deployed();
    const myNFTInstance = await MyNFT.deployed();
    const nftMarketInstance = await NFTMarket.deployed();

    await myNFTInstance.mint(accounts[1]);
    await myNFTInstance.approve(nftMarketInstance.address, 0, { from: accounts[1] });

    await nftMarketInstance.listNFT(myNFTInstance.address, 0, 100, { from: accounts[1] });
    await myTokenInstance.approve(nftMarketInstance.address, 100, { from: accounts[0] });

    await nftMarketInstance.buyNFT(0, { from: accounts[0] });

    const newOwner = await myNFTInstance.ownerOf(0);
    assert.equal(newOwner, accounts[0], "The new owner of the NFT should be the first account");
  });
});
