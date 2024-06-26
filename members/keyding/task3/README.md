# NFT Marketplace

NFT Marketplace contract.

## Configuring `.env`

Rename `.env.example` to `.env`, and configure the variables.

```bash
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_API_KEY
PRIVATE_KEY=YOUR_PRIVATE_KEY
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY
# Sepolia Testnet Chain ID
CHAIN_ID=11155111 
# After the contract is deployed
TOKEN_CONTRACT_ADDRESS=YOUR_TOKEN_CONTRACT_ADDRESS
NFT_CONTRACT_ADDRESS=YOUR_NFT_CONTRACT_ADDRESS
MARKETPLACE_CONTRACT_ADDRESS=YOUR_MARKETPLACE_CONTRACT_ADDRESS
```

## Run `start` script
```shell
# Equivalent to executing `forge clean`, `forge install`, and `forge build`. See `Makefile`
$ make start
```
## Deploy

### Deploy Token
```shell
$ make deploy-sepolia-token
```

### Deploy NFT
```shell
$ make deploy-sepolia-nft
```

### Deploy NFT Marketplace
```shell
$ make deploy-sepolia-marketplace
```

## Contract Interactive

### Mint NFT

Minting an NFT.

```shell
$ make mint-nft

# == Logs ==
# Minted NFT with tokenId: 0.
```

### List NFT

Listing an NFT.

> Note: Before execution, please update the `tokenId` variable in `script/ListNFT.s.sol` to the `tokenId` after minting NFT above.

```shell
$ make list-nft

# == Logs ==
# Listed NFT with listingId:: 0.
```

### Buy NFT

> Note: Before execution, please update the `listingId` variable in `script/BuyNFT.s.sol` to the `listingId` after listing NFT above.

```shell
$ make buy-nft
```

## My Deployed

### Token

- Contract Address: 
[0x94c30b60137810d274ff4C0d3b8259B031c3824C](https://sepolia.etherscan.io/address/0x94c30b60137810d274ff4C0d3b8259B031c3824C)
- Transaction Hash: 
[0xba371ae004802b761b019fc4a18fc8f98e0a9bb991aea6e7b426dfcf167f42c2](https://sepolia.etherscan.io/tx/0xba371ae004802b761b019fc4a18fc8f98e0a9bb991aea6e7b426dfcf167f42c2)

### NFT

- Contract Address:
[0x15C42c4FD0eC8C281Db3dAF0296Bb55E69c3a640](https://sepolia.etherscan.io/address/0x15C42c4FD0eC8C281Db3dAF0296Bb55E69c3a640)
- Transaction Hash:
[0xc7ea3092bf3d8b720e5b1b0b028a4b61691595f7c5f438c361cad3934c4fd6f0](https://sepolia.etherscan.io/tx/0xc7ea3092bf3d8b720e5b1b0b028a4b61691595f7c5f438c361cad3934c4fd6f0)

### NFT Marketplace

- Contract Address:
[0x32e566863A2E707322766BDC3C69A6Ce48c87006](https://sepolia.etherscan.io/address/0x32e566863A2E707322766BDC3C69A6Ce48c87006)
- Transaction Hash:
[0x38100a4dc246fc808f6dd1ece1dbe2d79915b21dda60299d0971cc059c41c11d](https://sepolia.etherscan.io/tx/0x38100a4dc246fc808f6dd1ece1dbe2d79915b21dda60299d0971cc059c41c11d)

## My Contract Interactive

### My Test Wallet

Address: 
[0xa831eeEFD053bfCa2E70293E2e0DA8660fca13Fa](https://sepolia.etherscan.io/address/0xa831eeefd053bfca2e70293e2e0da8660fca13fa)

### Mint NFT

Transaction Hash:
[0x3a69573858c48bd6c64d5657c61d88af41b66cd068f9128c15a1cb7ad0ad8bac](https://sepolia.etherscan.io/tx/0x3a69573858c48bd6c64d5657c61d88af41b66cd068f9128c15a1cb7ad0ad8bac)

### List NFT

Transaction Hash:
[0xc1f8ff662e97a50667d4cbd3170396a89c3abf4cd66db82801240977b9eab009](https://sepolia.etherscan.io/tx/0xc1f8ff662e97a50667d4cbd3170396a89c3abf4cd66db82801240977b9eab009)

### Buy NFT

Transaction Hash:
[0x2287be4815b82d88a3dd92e30ab2c38552f6af492050f64b13e85c612b86464c](https://sepolia.etherscan.io/tx/0x2287be4815b82d88a3dd92e30ab2c38552f6af492050f64b13e85c612b86464c)

### ReList NFT

Transaction Hash:
[0x24a53241870deacd9d2885a8c61d8e150f0bfb5daaf433c56ca98027dc8b25ff](https://sepolia.etherscan.io/tx/0x24a53241870deacd9d2885a8c61d8e150f0bfb5daaf433c56ca98027dc8b25ff)