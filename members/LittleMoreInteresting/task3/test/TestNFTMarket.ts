import {
    
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { expect } from "chai";
  import hre from "hardhat";
describe("HoraceNFTMarket", function () {
    const NAME = 'Horace' ;
    const SYMBOL = 'HOR';
    async function deployHoraceNFTAndMarket() {
        const OBToken = await hre.ethers.getContractFactory("OBToken");
        const obt = await OBToken.deploy();
        const [user1 , user2] = await hre.ethers.getSigners();
        obt.connect(user1).faucet()
        obt.connect(user2).faucet()

        const HORACE = await hre.ethers.getContractFactory("HoraceNFT");
        const horace = await HORACE.deploy(NAME,SYMBOL);
       

        const token1 = await horace.getTokenCounter()
        await horace.connect(user1).mintNft();
        const token2 = await horace.getTokenCounter()
        await horace.connect(user1).mintNft();

        const MARKET = await hre.ethers.getContractFactory("NFTMarket")
        const market = await MARKET.deploy(obt.getAddress())

        return {obt,market,horace, user1, user2 ,token1,token2}
    }
    describe("MarketList",function(){
        it("should approved before listing",async function(){
           const {market,horace, token1} = await loadFixture(deployHoraceNFTAndMarket)
           await expect(market.list(horace.getAddress(),1000,token1)).to.be.revertedWithCustomError(
            market,
            "ErrorNFTNotApproved"
           ).withArgs(horace.getAddress(),token1);
        })
        it("Test Approve and list",async function(){
            const {market,horace,user1, token1} = await loadFixture(deployHoraceNFTAndMarket)
            const makretAddress = market.getAddress()
            horace.approve(makretAddress,token1)
            await expect(market.list(horace.getAddress(),1000,token1)).to.emit(
                market,
                "NftListed"
            ).withArgs(user1.address,horace.getAddress(),token1,1000,0);
        })
        it("Test error Price",async function(){
            const {market,horace,user1, token1} = await loadFixture(deployHoraceNFTAndMarket)
            const makretAddress = market.getAddress()
            horace.approve(makretAddress,token1)
            await expect(market.list(horace.getAddress(),0,token1)).to.be.revertedWithCustomError(
                market,
                "ErrorNFTInvalidPrice"
            )
        })
        it("Test buyNFT",async function(){
            const {obt,market,horace,user1,user2, token1} = await loadFixture(deployHoraceNFTAndMarket)
            const makretAddress = market.getAddress()
            await horace.approve(makretAddress,token1)
            const price = 1000;
            await market.list(horace.getAddress(),price,token1);
            // approve OBT
            await obt.connect(user2).approve(makretAddress,price)
            await market.connect(user2).buy(horace.getAddress(),token1, { value: price });
            expect( await horace.connect(user2).ownerOf(token1)).to.equal(user2.address);
        })

        it("Test permitBuy", async function () {
            const {obt,market,horace,user1,user2, token1} = await loadFixture(deployHoraceNFTAndMarket)
            const makretAddress = await market.getAddress()
            await horace.approve(makretAddress,token1)
            const price = 1000;
            await market.list(horace.getAddress(),price,token1);
            const [,name,version,chainId,vAddr] = await obt.eip712Domain();

            const nonce = await obt.nonces(user2.address);
            const deadline = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
            const sign = await user2.signTypedData({
                name:name,
                version:version,
                chainId:chainId,
                verifyingContract:vAddr
            },{
                Permit: [
                    { name: "owner", type: "address" },
                    { name: "spender", type: "address" },
                    { name: "value", type:"uint256"},
                    { name: "nonce", type: "uint256" },
                    { name: "deadline", type: "uint256" }
                ]
            },{
                owner:user2.address,
                spender:makretAddress,
                value:price,
                nonce:nonce,
                deadline:deadline
            })
            console.log("before",await obt.balanceOf(user1));
            await market.connect(user2).permitBuy(horace.getAddress(),token1, price,deadline,sign);
            expect( await horace.connect(user2).ownerOf(token1)).to.equal(user2.address);
            console.log("after",await obt.balanceOf(user1));
        })

    })

})