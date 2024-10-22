// Importing required modules and libraries from the ethers.js library.
const { Contract, ContractFactory } = require("ethers");

// Importing the contract JSON artifacts.
const WETH9 = require("../json/WETH9.json");
const factoryArtifact = require("../json/IUniswapV2Factory.json");
const routerArtifact = require("../json/IUniswapV2Router02.json");
const pairArtifact = require("../json/IUniswapV2Pair.json");
const { ethers } = require("hardhat");

// Main deployment function.
async function main() {
  // 1. Retrieve signers from the ethers provider.
  const [owner] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${owner.address}`);

  // 2. Initialize a new contract factory for the Uniswap V2 Factory.
  // This factory requires the ABI and bytecode from the factoryArtifact.
  const Factory = new ContractFactory(
    factoryArtifact.abi,
    factoryArtifact.bytecode,
    owner
  );
  console.log("Deploying Factory...")
  // 3. Use the initialized factory to deploy a new Factory contract.
  // The deployment is signed by the owner.
  const factory = await Factory.deploy(owner.address);
  console.log("Factory deployed")
  // 4. After deployment, retrieve the address of the newly deployed Factory contract.
  const factoryAddress = await factory.getAddress();
  console.log(`Factory deployed to ${factoryAddress}`);

  // 5. Initialize a contract factory specifically for the Tether (USDT) token.
  const USDT = await ethers.getContractFactory("Tether", owner);

  // 6. Deploy the USDT contract using the above-initialized factory.
  const usdt = await USDT.deploy();

  // 7. Get the address of the deployed USDT contract.
  const usdtAddress = await usdt.getAddress();
  console.log(`USDT deployed to ${usdtAddress}`);

  // 8. Similarly, initialize a contract factory for the UsdCoin (USDC) token.
  const USDC = await ethers.getContractFactory("UsdCoin", owner);

  // 9. Deploy the USDC contract.
  const usdc = await USDC.deploy();

  // 10. Get the address of the deployed USDC contract.
  const usdcAddress = await usdc.getAddress();
  console.log(`USDC deployed to ${usdcAddress}`);

  const BNB = await ethers.getContractFactory("BNB", owner);
  const bnb = await BNB.deploy();
  const bnbAddress = await bnb.getAddress();
  console.log(`BNB deployed to ${bnbAddress}`);



  /**
   * Now that we have deployed the Factory contract and the two ERC20 tokens,
   * we can deploy the Router contract.
   * The Router contract requires the address of the Factory contract and the WETH9 contract.
   * The WETH9 contract is a wrapper for the ETH token.
   * But prior to that, we need to mint some USDT and USDC tokens to the owner. Lets do that first.
   */

  // 11. Mint 1000 USDT tokens to the owner.
  await usdt.connect(owner).mint(owner.address, ethers.parseEther("1000"));

  // 12. Mint 1000 USDC tokens to the owner.
  await usdc.connect(owner).mint(owner.address, ethers.parseEther("1000"));

  await bnb.connect(owner).mint(owner.address, ethers.parseEther("1000"));

  // 13. Utilizing the Factory contract, create a trading pair using the addresses of USDT and USDC.
  const tx1 = await factory.createPair(usdtAddress, usdcAddress);

  // 14. Wait for the transaction to be confirmed on the blockchain.
  await tx1.wait();

  const tx2 = await factory.createPair(usdtAddress, bnbAddress);
  await tx2.wait();

  const tx3 = await factory.createPair(usdcAddress, bnbAddress);
  await tx3.wait();

  // 15. Retrieve the address of the created trading pair from the Factory contract.
  const pairAddress = await factory.getPair(usdtAddress, usdcAddress);
  console.log(`Pair deployed to ${pairAddress}`);

  // 16. Initialize a new contract instance for the trading pair using its address and ABI.
  const pair = new Contract(pairAddress, pairArtifact.abi, owner);

  // 17. Query the reserves of the trading pair to check liquidity.
  let reserves = await pair.getReserves();
  console.log(`Reserves: ${reserves[0].toString()}, ${reserves[1].toString()}`);

  // 18. Initialize a new contract factory for the WETH9 contract.
  const WETH = new ContractFactory(WETH9.abi, WETH9.bytecode, owner);
  const weth = await WETH.deploy();
  const wethAddress = await weth.getAddress();
  console.log(`WETH deployed to ${wethAddress}`);

  // 19. Initialize a new contract factory for the Router contract.
  // const Router = new ContractFactory(
  //   routerArtifact.abi,
  //   routerArtifact.bytecode,
  //   owner
  // );
  const Router = await ethers.getContractFactory("UniswapV2Router02", owner);
  // 20. Deploy the Router contract using the above-initialized factory.
  console.log("Deploying Router...")
  const router = await Router.deploy(factoryAddress, wethAddress);
  const routerAddress = await router.connect(owner).getAddress();
  console.log(`Router deployed to ${routerAddress}`);

  const MaxUint256 =
    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

  const approveTx1 = await usdt.approve(routerAddress, MaxUint256);
  await approveTx1.wait();
  const approvalTx2 = await usdc.approve(routerAddress, MaxUint256);
  await approvalTx2.wait();
  const approvalTx3 = await bnb.approve(routerAddress, MaxUint256);
  await approvalTx3.wait();

  const token0Amount = ethers.parseUnits("100");
  const token1Amount = ethers.parseUnits("100");

  const lpTokenBalanceBefore = await pair.balanceOf(owner.address);
  console.log(
    `LP tokens for the owner before: ${lpTokenBalanceBefore.toString()}`
  );

  const deadline = Math.floor(Date.now() / 1000) + 10 * 60;

  const addLiquidityTx = await router
    .connect(owner)
    .addLiquidity(
      usdtAddress,
      usdcAddress,
      token0Amount,
      token1Amount,
      1,
      1,
      owner.address,
      deadline
    );
  await addLiquidityTx.wait();

  const addLiquidityTx2 = await router
    .connect(owner)
    .addLiquidity(
      usdtAddress,
      bnbAddress,
      token0Amount,
      token1Amount,
      1,
      1,
      owner.address,
      deadline
    );
  await addLiquidityTx2.wait();

  const addLiquidityTx3 = await router
    .connect(owner)
    .addLiquidity(
      usdcAddress,
      bnbAddress,
      token0Amount,
      token1Amount,
      1,
      1,
      owner.address,
      deadline
    );
  await addLiquidityTx3.wait();

  // Check LP token balance for the owner
  const lpTokenBalance = await pair.balanceOf(owner.address);
  console.log(`LP tokens for the owner: ${lpTokenBalance.toString()}`);

  reserves = await pair.getReserves();
  console.log(`Reserves: ${reserves[0].toString()}, ${reserves[1].toString()}`);

  console.log("USDT_ADDRESS", usdtAddress);
  console.log("USDC_ADDRESS", usdcAddress);
  console.log("BNB_ADDRESS", bnbAddress);
  console.log("WETH_ADDRESS", wethAddress);
  console.log("FACTORY_ADDRESS", factoryAddress);
  console.log("ROUTER_ADDRESS", routerAddress);
}

// This command is used to run the script using hardhat.
// npx hardhat run --network localhost scripts/01_deployContracts.js

// Executing the main function and handling possible outcomes.
main()
  .then(() => process.exit(0)) // Exiting the process if deployment is successful.
  .catch((error) => {
    console.error(error); // Logging any errors encountered during deployment.
    process.exit(1); // Exiting the process with an error code.
  });
