## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

- **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
- **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
- **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
- **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Install

```shell
$ forge install foundry-rs/forge-std --no-git --no-commit
$ forge install OpenZeppelin/openzeppelin-contracts --no-git --no-commit
$ forge install Cyfrin/foundry-devops --no-git --no-commit
```

### Build

```shell
$ forge build
```

### Test

```shell
$ make test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ cp .env.example .env
$ make deploy
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```

### 测试步骤

> 按顺序执行即可

#### OWNER

```
make deploy
make target=${BUYER_ADRESS} amount=20 mintToken
make sellerAddress=${} register
```

#### SELLER

```
make marketAddress=${} mintNft
make tokenId=${} price=16 launch

0x95cefe22b77a1a95b6db2c02d34c6754ddf0dbcebce3e3d8fe750e5221c88c85
```

#### BUYER

```
make marketAddress=${} amount=18 approveToken
make tokenId=${} buy

0xc6a3c0649d7821bdd03c48da9644d4fbe721385ad615d60a25cc2efa45e01b82
```
