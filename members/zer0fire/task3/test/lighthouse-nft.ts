import { ethers } from "hardhat";
import { Signer, Contract } from "ethers";
import { expect } from "chai"; // 引入 Chai 断言库
import { LighthouseNft } from "../typechain-types/contracts/lighthouse-nft.sol"; // 导入 LighthouseNft 合约的类型定义

describe("LighthouseNft", () => {
  let owner: Signer;
  let lighthouseNft: LighthouseNft; // 使用 Contract 类型声明合约实例

  before(async () => {
    [owner] = await ethers.getSigners();
    console.log("owner:", owner);
    // const [owner, addr1] = await ethers.getSigners();
    // console.log("addr1:", addr1);

    const LighthouseNftFactory = await ethers.getContractFactory(
      "LighthouseNft",
      owner
    );
    lighthouseNft = await LighthouseNftFactory.deploy("YourNFTName", "NFT");
  });

  it("should mint a new NFT", async () => {
    const tokenId = 1;
    const to = await owner.getAddress();

    await expect(lighthouseNft.connect(owner).mintLighthouseNFT(to, tokenId))
      .to.emit(lighthouseNft, "LighthouseNFTMinted")
      .withArgs(to, tokenId);

    const ownerOfToken = await lighthouseNft.ownerOf(tokenId);
    expect(ownerOfToken).to.equal(to);
  });

  it("should retrieve the owner of an existing NFT", async () => {
    const tokenId = 2; // 使用一个新的 tokenId
    const to = await owner.getAddress();

    // 确保 tokenId 2 已被铸造
    await lighthouseNft.connect(owner).mintLighthouseNFT(to, tokenId);

    const ownerOfToken = await lighthouseNft.ownerOf(tokenId);
    expect(ownerOfToken).to.equal(to);
  });
});
