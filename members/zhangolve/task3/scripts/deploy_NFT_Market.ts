import { deploy } from './ethers-lib'

(async () => {
  try {
    const result = await deploy('NFTMarket', ['0x5B38Da6a701c568545dCfcB03FcB875f56beddC4', '0xf8e81D47203A594245E36C48e151709F0C19fBe8',1]) // this is a fake address
    console.log(`address: ${result.address}`)
  } catch (e) {
    console.log(e.message)
  }
})();