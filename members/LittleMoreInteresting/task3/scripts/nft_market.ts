import hre from "hardhat";
import * as dotenv from "dotenv";
import data from '../ignition/deployments/chain-11155111/deployed_addresses.json'
dotenv.config();
const { API_URL, PRIVATE_KEY,ACCOUNT_A,ACCOUNT_B } = process.env;
async function main() {
  const seller = await hre.ethers.getSigner(ACCOUNT_A as string);
  const buyer = await hre.ethers.getSigner(ACCOUNT_B as string);
  
  const OBToken = await hre.ethers.getContractFactory("OBToken");
  const obt = OBToken.attach(data["OBToken#OBToken"])

  const makretAddress = data["NFTMarket#NFTMarket"];
  const nftAddress = data["HoraceNFT#HoraceNFT"];
  
  const HoraceNFT = await hre.ethers.getContractFactory("HoraceNFT");
  const nft = HoraceNFT.attach(data["HoraceNFT#HoraceNFT"])
  const token1 = 1;
  const price = 0.001 * 10 ** 18;
  
  const NFTMarket = await hre.ethers.getContractFactory("NFTMarket");
  const market = NFTMarket.attach(makretAddress)
  try {
    //const approve = await nft.connect(seller).getFunction("approve")(makretAddress,token1);
    //console.log(approve);

    // const tx1 = await market.connect(seller).getFunction("list")(nftAddress,price,token1)
    // console.log(tx1)
    const [,name,version,chainId,vAddr] = await obt.getFunction("eip712Domain")();
    const nonce = await obt.getFunction('nonces')(buyer.address);
    const deadline = Math.floor(Date.now() / 1000) + 60 * 60 * 24;

    const sign = await buyer.signTypedData({
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
        owner:buyer.address,
        spender:makretAddress,
        value:price,
        nonce:nonce,
        deadline:deadline
    })
    const tx2 = await market.connect(buyer).getFunction("permitBuy")(nftAddress,token1, price,deadline,sign)
    console.log(tx2)
  } catch (error) {
    console.log(error)
  }

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});