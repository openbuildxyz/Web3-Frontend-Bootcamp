## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Example Walkthrough

### Install Foundry
```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

Then go the right folder of our example:

```bash
cd contract-deployment-demos/foundry-demo
```

### Compile

```bash
forge build
```
### Deploy

A Deployment script and use of environment variables has already been set up for you. You can view the script at script/Counter.s.sol

Rename your .env.example file to .env and fill in your private key. The RPC URL has already been filled in along with the verifier URL. 

To use the variables in your .env file run the following command: 

```shell
source .env
```

You can now deploy to Morph with the following command: 

```shell
forge script script/Counter.s.sol --rpc-url $RPC_URL --broadcast --private-key $DEPLOYER_PRIVATE_KEY --legacy
```

Adjust as needed for your own script names. 

### Verify 

Verification requires some flags passed to the normal verification script. You can verify using the command below:

```bash
 forge verify-contract YourContractAddress Counter\
  --chain 2810 \
  --verifier-url $VERIFIER_URL \
  --verifier blockscout --watch
```

Once succeed, you can check your contract and the deployment transaction on [Morph Holesky Explorer](https://explorer-holesky.morphl2.io)

### Cast

```shell
cast <subcommand>
```

### Help

```shell
forge --help
anvil --help
cast --help
```

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
forge build
```

### Test

```shell
forge test
```

### Format

```shell
forge fmt
```

### Gas Snapshots

```shell
forge snapshot
```

### Anvil

```shell
anvil
```


