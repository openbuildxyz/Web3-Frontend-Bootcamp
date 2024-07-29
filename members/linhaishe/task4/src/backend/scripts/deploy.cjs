/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  // Get the ContractFactories and Signers here.
  const erc20Token = await ethers.getContractFactory('ZeroEgg');
  const NFT = await ethers.getContractFactory('NFTM');
  const Marketplace = await ethers.getContractFactory('Market');

  // deploy contracts
  const _erc20Token = await erc20Token.deploy();
  const _NFT = await NFT.deploy();

  console.log('_erc20Token', _erc20Token.address);
  console.log('_NFT', _NFT.address);

  const _Marketplace = await Marketplace.deploy(_erc20Token.address);
  console.log('_Marketplace', _Marketplace.address);

  // Save copies of each contracts abi and address to the frontend.
  saveFrontendFiles(_erc20Token, 'ZeroEgg');
  saveFrontendFiles(_NFT, 'NFTM');
  saveFrontendFiles(_Marketplace, 'Market');
}

function saveFrontendFiles(contract, name) {
  const fs = require('fs');
  const contractsDir = __dirname + '/../contractsData';

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
