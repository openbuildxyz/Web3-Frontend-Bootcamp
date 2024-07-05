# NFT Marketplace

NFT Marketplace contract.

## Create local test network node

Create a local test network node, record the test `wallet` and `private key`.

```bash
$ anvil
```

## Configuring `.env`

Rename `.env.example` to `.env`, and configure the variables.

```bash
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_API_KEY
PRIVATE_KEY=YOUR_PRIVATE_KEY
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY
# Sepolia Testnet Chain ID
CHAIN_ID=11155111 # The local test network is 31337
# Contract post-deployment updates
TOKEN_CONTRACT_ADDRESS=YOUR_TOKEN_CONTRACT_ADDRESS
NFT_CONTRACT_ADDRESS=YOUR_NFT_CONTRACT_ADDRESS
MARKETPLACE_CONTRACT_ADDRESS=YOUR_MARKETPLACE_CONTRACT_ADDRESS
```

## Run `start` script

```shell
# Equivalent to executing `forge clean`, `forge install`, and `forge build`. See `Makefile`
$ make start
```

## Test

```bash
$ make test
```

## Deploy

### Deploy Token

#### local
```shell
$ make deploy-token-local
```

#### sepolia
```shell
$ make deploy-token-sepolia
```

### Deploy NFT

#### local
```shell
$ make deploy-nft-local
```

#### sepolia
```shell
$ make deploy-nft-sepolia
```

### Deploy NFT Marketplace

#### local
```shell
$ make deploy-marketplace-local
```

#### sepolia
```shell
$ make deploy-marketplace-sepolia
```

## Contract Interactive

### Mint NFT

Minting an NFT.

#### local
```shell
$ make mint-nft-local

# == Logs ==
# Minted NFT with tokenId: 0.
```

#### sepolia
```shell
$ make mint-nft

# == Logs ==
# Minted NFT with tokenId: 0.
```

### List NFT

Listing an NFT.

> Note: Before execution, please update the `tokenId` variable in `script/ListNFT.s.sol` to the `tokenId` after minting NFT above.

#### local
```shell
$ make list-nft-local

# == Logs ==
# Listed NFT with listingId:: 0.
```

#### sepolia
```shell
$ make list-nft

# == Logs ==
# Listed NFT with listingId:: 0.
```

### Delist NFT

Delist an NFT.

#### local
```shell
$ make delist-nft-local
```

#### sepolia
```shell
$ make delist-nft
```

### Buy NFT

> Note: Before execution, please update the `listingId` variable in `script/BuyNFT.s.sol` to the `listingId` after listing NFT above.

#### local
```shell
$ make buy-nft-local
```

#### sepolia
```shell
$ make buy-nft
```

### Get all nfts

#### local
```shell
$ make get-all-nfts-local
```

#### sepolia
```shell
$ make get-all-nfts
```

## My Deployed

### Token

- Contract Address: 
[0xe3c5D940bd9A05F9432157FC1eBc9e4f42cdBA0f](https://sepolia.etherscan.io/address/0xe3c5D940bd9A05F9432157FC1eBc9e4f42cdBA0f)
- Transaction Hash: 
[0x22c06744279c673844c488c0bc4a468ca96ad61be749469ba3093a0ce433f309](https://sepolia.etherscan.io/tx/0x22c06744279c673844c488c0bc4a468ca96ad61be749469ba3093a0ce433f309)

### NFT

- Contract Address:
[0x271066c63cc5180e5e3181de8BD68eBeC1024Efe](https://sepolia.etherscan.io/address/0x271066c63cc5180e5e3181de8BD68eBeC1024Efe)
- Transaction Hash:
[0x8ff44b61ec49b4cb30e0a4596b518c976037e7e8e26de78997c34b298f395684](https://sepolia.etherscan.io/tx/0x8ff44b61ec49b4cb30e0a4596b518c976037e7e8e26de78997c34b298f395684)

### NFT Marketplace

- Contract Address:
[0xA048C35b0150B222eb0bF03538E77139175E6A63](https://sepolia.etherscan.io/address/0xA048C35b0150B222eb0bF03538E77139175E6A63)
- Transaction Hash:
[0xce27bee8459cf3555df7840e2d5e1a3d74e30a6000bde2f1081a941b159c5549](https://sepolia.etherscan.io/tx/0xce27bee8459cf3555df7840e2d5e1a3d74e30a6000bde2f1081a941b159c5549)

## My Contract Interactive

### My Test Wallet

Address: 
[0xa831eeEFD053bfCa2E70293E2e0DA8660fca13Fa](https://sepolia.etherscan.io/address/0xa831eeefd053bfca2e70293e2e0da8660fca13fa)

### Mint NFT

Transaction Hash:
[0x2f39ab2b8c94258af6e32844d4f3c454250e8e7b7ab68fbaf7bd9cf65c4482cb](https://sepolia.etherscan.io/tx/0x2f39ab2b8c94258af6e32844d4f3c454250e8e7b7ab68fbaf7bd9cf65c4482cb)

### List NFT

Transaction Hash:
[0x26b044346dad468c92f6ad9fc7906aeab1a7c2ff655c460460528ffea910200d](https://sepolia.etherscan.io/tx/0x26b044346dad468c92f6ad9fc7906aeab1a7c2ff655c460460528ffea910200d)

### Delist NFT

Transaction Hash:
[0xd8f4ed44b1acb284c31527794cdc41dbe13952d0b91902f7ec04b2393376d377](https://sepolia.etherscan.io/tx/0xd8f4ed44b1acb284c31527794cdc41dbe13952d0b91902f7ec04b2393376d377)

### ReList NFT

Transaction Hash:
[0xebad2a6e0cd95b1300393d30862d95131b14c852054f0bfd617528fed16e8e61](https://sepolia.etherscan.io/tx/0xebad2a6e0cd95b1300393d30862d95131b14c852054f0bfd617528fed16e8e61)

### Buy NFT

Transaction Hash:
- approve
[0x691cbbc24dea5008c168d6f938e5474e8669c7fadc207a9bf5370faa343d986c](https://sepolia.etherscan.io/tx/0x691cbbc24dea5008c168d6f938e5474e8669c7fadc207a9bf5370faa343d986c)
- buy
[0xd35d0206c9b43bc1dc338935449c99577b256f4522d029565ad8b649b6e65ab8](https://sepolia.etherscan.io/tx/0xd35d0206c9b43bc1dc338935449c99577b256f4522d029565ad8b649b6e65ab8)

### Get All Nfts

```bash
== Logs ==
  All NFTs: 1 

  tokenId: 0 listingId: 0
  isListed: false
  owner 0xa831eeEFD053bfCa2E70293E2e0DA8660fca13Fa
  isSold: true price 20000000000000000000
```
