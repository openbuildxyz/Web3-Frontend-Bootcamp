import { deploy } from './ethers-lib'

(async () => {
  try {
    const result = await deploy('ERC20Token', [100000000, '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4']) // this is a fake address
    console.log(`address: ${result.address}`)
  } catch (e) {
    console.log(e.message)
  }
})();

