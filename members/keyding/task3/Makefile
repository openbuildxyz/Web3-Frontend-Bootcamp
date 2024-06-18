# include .env file and export its env vars
# (-include to ignore error if it does not exist)
-include .env

.PHONY: test

start: clean install build 

# Clean the repo
clean  :; forge clean

# Remove all modules
remove :; rm -rf .gitmodules && rm -rf .git/modules/* && rm -rf lib && touch .gitmodules && git add . && git commit -m "modules"

# Install the Modules
install :; forge install --no-commit

# Update Dependencies
update:; forge update

# Builds
build  :; forge build

# Format
fmt :; forge fmt

# Tests
test :; forge clean && forge test --optimize --optimizer-runs 200 -vv

# Generate Gas Snapshots
snapshot :; forge clean && forge snapshot

deploy-sepolia-token:
	@forge script script/Deploy.s.sol:DeployToken --chain-id $(CHAIN_ID) \
	--rpc-url $(SEPOLIA_RPC_URL) \
	--private-key $(PRIVATE_KEY) \
	--etherscan-api-key $(ETHERSCAN_API_KEY) \
	--broadcast --verify -vvvv

deploy-sepolia-nft:
	@forge script script/Deploy.s.sol:DeployNFT --chain-id $(CHAIN_ID) \
	--rpc-url $(SEPOLIA_RPC_URL) \
	--private-key $(PRIVATE_KEY) \
	--etherscan-api-key $(ETHERSCAN_API_KEY) \
	--broadcast --verify -vvvv

deploy-sepolia-marketplace:
	@forge script script/Deploy.s.sol:DeployNFTMarketplace --chain-id $(CHAIN_ID) \
	--rpc-url $(SEPOLIA_RPC_URL) \
	--private-key $(PRIVATE_KEY) \
	--etherscan-api-key $(ETHERSCAN_API_KEY) \
	--broadcast --verify -vvvv

deploy-sepolia-no-verify:
	@forge script script/DeployToken.s.sol:DeployToken --chain-id $(CHAIN_ID) \
	--rpc-url $(SEPOLIA_RPC_URL) \
	--private-key $(PRIVATE_KEY) \
	--broadcast -vvvv

deploy-sepolia-nft-no-verify:
	@forge script script/Deploy.s.sol:DeployNFT --chain-id $(CHAIN_ID) \
	--rpc-url $(SEPOLIA_RPC_URL) \
	--private-key $(PRIVATE_KEY) \
	--broadcast -vvvv

deploy-sepolia-marketplace-no-verify:
	@forge script script/Deploy.s.sol:DeployNFTMarketplace --chain-id $(CHAIN_ID) \
	--rpc-url $(SEPOLIA_RPC_URL) \
	--private-key $(PRIVATE_KEY) \
	--broadcast -vvvv

mint-nft:
	@forge script script/MintNFT.s.sol:MintNFT --chain-id $(CHAIN_ID) \
	--rpc-url $(SEPOLIA_RPC_URL) \
	--etherscan-api-key $(ETHERSCAN_API_KEY) \
	--broadcast -vvvv

list-nft:
	@forge script script/ListNFT.s.sol:ListNFT --chain-id $(CHAIN_ID) \
	--rpc-url $(SEPOLIA_RPC_URL) \
	--etherscan-api-key $(ETHERSCAN_API_KEY) \
	--broadcast -vvvv

buy-nft:
	@forge script script/BuyNFT.s.sol:BuyNFT --chain-id $(CHAIN_ID) \
	--rpc-url $(SEPOLIA_RPC_URL) \
	--etherscan-api-key $(ETHERSCAN_API_KEY) \
	--broadcast -vvvv