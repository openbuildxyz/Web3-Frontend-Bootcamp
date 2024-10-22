// Import required modules from ethers library
const { Contract, ContractFactory } = require("ethers");

// Importing ABI and bytecode for required contracts
const WETH9 = require("../WETH9.json");
const factoryArtifact = require("@uniswap/v2-core/build/UniswapV2Factory.json");
const routerArtifact = require("@uniswap/v2-periphery/build/UniswapV2Router02.json");
const pairArtifact = require("@uniswap/v2-periphery/build/IUniswapV2Pair.json");
const usdtArtifact = require("../artifacts/contracts/USDT.sol/Tether.json");
const usdcArtifact = require("../artifacts/contracts/USDC.sol/UsdCoin.json");

// Hardcoded contract addresses
const USDT_ADDRESS = "0x7bc06c482dead17c0e297afbc32f6e63d3846650";
const USDC_ADDRESS = "0xc351628eb244ec633d5f21fbd6621e1a683b1181";
const WETH_ADDRESS = "0xb0d4afd8879ed9f52b28595d31b441d079b2ca07";
const FACTORY_ADDRESS = "0x7969c5ed335650692bc04293b07f5bf2e7a673c0";
const ROUTER_ADDRESS = "0x162a433068f51e18b7d13932f27e66a3f99e6890";
const PAIR_ADDRESS = "0x6bf76d938a85cc44d316ce98acc7867bf8e8352a";

// Setting up a provider to interact with the Ethereum network
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// Initializing contract instances with their addresses and ABIs
const router = new Contract(ROUTER_ADDRESS, routerArtifact.abi, provider);
const usdt = new Contract(USDT_ADDRESS, usdtArtifact.abi, provider);
const usdc = new Contract(USDC_ADDRESS, usdcArtifact.abi, provider);

// Function to log the balance of ETH, USDT, and USDC for a given signer
const logBalance = async (signerObj) => {
  // Fetch balances from blockchain
  const ethBalance = await provider.getBalance(signerObj.address);
  const usdtBalance = await usdt.balanceOf(signerObj.address);
  const usdcBalance = await usdc.balanceOf(signerObj.address);

  const balances = {
    ethBalance: ethBalance,
    usdtBalance: usdtBalance,
    usdcBalance: usdcBalance,
  };

  // Log the balances
  console.log(balances);
};

// Main function that will be executed
const main = async () => {
  // Fetching the owner's signer object
  const [owner] = await ethers.getSigners();

  // Logging initial balances
  await logBalance(owner);

  // Approving the Uniswap router to spend USDT on owner's behalf
  const approveTx = await usdt
    .connect(owner)
    .approve(ROUTER_ADDRESS, ethers.parseUnits("1", 18));
  await approveTx.wait();

  // Performing the swap on Uniswap: USDT for USDC
  const tx = await router
    .connect(owner)
    .swapExactTokensForTokens(
      ethers.parseUnits("1", 18),
      0,
      [USDT_ADDRESS, USDC_ADDRESS],
      owner.address,
      Math.floor(Date.now() / 1000) + 60 * 10,
      {
        gasLimit: 1000000,
      }
    );

  // Waiting for the swap transaction to be confirmed
  await tx.wait();

  // Logging final balances after the swap
  await logBalance(owner);
};

// Executing the main function and handling success/failure
main()
  .then(() => process.exit(0)) // Exit script if everything worked
  .catch((error) => {
    console.error(error); // Log any errors
    process.exit(1); // Exit with an error code
  });
