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
[0x4B65Ea79B142B6ED8c24D845b1fA5b04ecF5d89C](https://sepolia.etherscan.io/address/0x4b65ea79b142b6ed8c24d845b1fa5b04ecf5d89c)
- Transaction Hash: 
[0x5037479b30ccc96cae7d15db4d237d4f061608bc2645dc937a69ceb2b5fca9f1](https://sepolia.etherscan.io/tx/0x5037479b30ccc96cae7d15db4d237d4f061608bc2645dc937a69ceb2b5fca9f1)

### NFT

- Contract Address:
[0x8Cefd9736B086C7D08251E3F1f820CDb98A54AeA](https://sepolia.etherscan.io/address/0x8cefd9736b086c7d08251e3f1f820cdb98a54aea)
- Transaction Hash:
[0xb5c239effc8c613da0f985a6f83c5a3e12af9dee7af0baa8759afbc2759d07ba](https://sepolia.etherscan.io/tx/0xb5c239effc8c613da0f985a6f83c5a3e12af9dee7af0baa8759afbc2759d07ba)

### NFT Marketplace

- Contract Address:
[0xBf6D1656F089A190fE8776380eC221123E83BD59](https://sepolia.etherscan.io/address/0xBf6D1656F089A190fE8776380eC221123E83BD59)
- Transaction Hash:
[0x77ed6247d8d95efc7642e12f10945fe2a0fd4645fb5aecb8289180d3f7ff8374](https://sepolia.etherscan.io/tx/0x77ed6247d8d95efc7642e12f10945fe2a0fd4645fb5aecb8289180d3f7ff8374)

## My Contract Interactive

### My Test Wallet

Address: 
[0xa831eeEFD053bfCa2E70293E2e0DA8660fca13Fa](https://sepolia.etherscan.io/address/0xa831eeefd053bfca2e70293e2e0da8660fca13fa)

### Mint NFT

Transaction Hash:
[0xca6956fe8a4ed107d44561f6687f96b8b44e5588630ac10553c570f463952b47](https://sepolia.etherscan.io/tx/0xca6956fe8a4ed107d44561f6687f96b8b44e5588630ac10553c570f463952b47)

### List NFT

Transaction Hash:
[0x6e43cb617c3da49878521f3971c55b614a31ab5e146854f63ed9f4b6f5c4b4c6](https://sepolia.etherscan.io/tx/0x6e43cb617c3da49878521f3971c55b614a31ab5e146854f63ed9f4b6f5c4b4c6)

### Buy NFT

Transaction Hash:
[0x67cb83c4875eedc0755f8344d6ebad977ae0a40901324b9fadfd296558b7b262](https://sepolia.etherscan.io/tx/0x67cb83c4875eedc0755f8344d6ebad977ae0a40901324b9fadfd296558b7b262)