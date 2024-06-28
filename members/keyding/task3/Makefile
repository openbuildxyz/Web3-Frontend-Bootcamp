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

deploy-token-sepolia:
	@forge script script/Deploy.s.sol:DeployToken --chain-id $(CHAIN_ID) \
	--rpc-url $(SEPOLIA_RPC_URL) \
	--private-key $(PRIVATE_KEY) \
	--etherscan-api-key $(ETHERSCAN_API_KEY) \
	--broadcast --verify -vvvv

deploy-token-local:
	@forge script script/Deploy.s.sol:DeployToken --chain-id $(CHAIN_ID) \
	--fork-url http://127.0.0.1:8545 \
	--private-key $(PRIVATE_KEY) \
	--broadcast -vvvv

deploy-nft-sepolia:
	@forge script script/Deploy.s.sol:DeployNFT --chain-id $(CHAIN_ID) \
	--rpc-url $(SEPOLIA_RPC_URL) \
	--private-key $(PRIVATE_KEY) \
	--etherscan-api-key $(ETHERSCAN_API_KEY) \
	--broadcast --verify -vvvv

deploy-nft-local:
	@forge script script/Deploy.s.sol:DeployNFT --chain-id $(CHAIN_ID) \
	--fork-url http://127.0.0.1:8545 \
	--private-key $(PRIVATE_KEY) \
	--broadcast -vvvv

deploy-marketplace-sepolia:
	@forge script script/Deploy.s.sol:DeployNFTMarketplace --chain-id $(CHAIN_ID) \
	--rpc-url $(SEPOLIA_RPC_URL) \
	--private-key $(PRIVATE_KEY) \
	--etherscan-api-key $(ETHERSCAN_API_KEY) \
	--broadcast --verify -vvvv

deploy-marketplace-local:
	@forge script script/Deploy.s.sol:DeployNFTMarketplace --chain-id $(CHAIN_ID) \
	--fork-url http://127.0.0.1:8545 \
	--private-key $(PRIVATE_KEY) \
	--broadcast -vvvv

mint-nft:
	@forge script script/Interaction.s.sol:MintNFT --chain-id $(CHAIN_ID) \
	--rpc-url $(SEPOLIA_RPC_URL) \
	--etherscan-api-key $(ETHERSCAN_API_KEY) \
	--broadcast -vvvv

mint-nft-local:
	@forge script script/Interaction.s.sol:MintNFT --chain-id $(CHAIN_ID) \
	--fork-url http://127.0.0.1:8545 \
	--broadcast -vvvv

list-nft:
	@forge script script/Interaction.s.sol:ListNFT --chain-id $(CHAIN_ID) \
	--rpc-url $(SEPOLIA_RPC_URL) \
	--etherscan-api-key $(ETHERSCAN_API_KEY) \
	--broadcast -vvvv

list-nft-local:
	@forge script script/Interaction.s.sol:ListNFT --chain-id $(CHAIN_ID) \
	--fork-url http://127.0.0.1:8545 \
	--broadcast -vvvv

delist-nft:
	@forge script script/Interaction.s.sol:DelistNFT --chain-id $(CHAIN_ID) \
	--rpc-url $(SEPOLIA_RPC_URL) \
	--etherscan-api-key $(ETHERSCAN_API_KEY) \
	--broadcast -vvvv

delist-nft-local:
	@forge script script/Interaction.s.sol:DelistNFT --chain-id $(CHAIN_ID) \
	--fork-url http://127.0.0.1:8545 \
	--broadcast -vvvv

relist-nft:
	@forge script script/Interaction.s.sol:RelistNFT --chain-id $(CHAIN_ID) \
	--rpc-url $(SEPOLIA_RPC_URL) \
	--etherscan-api-key $(ETHERSCAN_API_KEY) \
	--broadcast -vvvv

relist-nft-local:
	@forge script script/Interaction.s.sol:RelistNFT --chain-id $(CHAIN_ID) \
	--fork-url http://127.0.0.1:8545 \
	--broadcast -vvvv

buy-nft:
	@forge script script/Interaction.s.sol:BuyNFT --chain-id $(CHAIN_ID) \
	--rpc-url $(SEPOLIA_RPC_URL) \
	--etherscan-api-key $(ETHERSCAN_API_KEY) \
	--broadcast -vvvv

buy-nft-local:
	@forge script script/Interaction.s.sol:BuyNFT --chain-id $(CHAIN_ID) \
	--fork-url http://127.0.0.1:8545 \
	--broadcast -vvvv

get-all-nfts:
	@forge script script/Interaction.s.sol:GetAllNfts --chain-id $(CHAIN_ID) \
	--rpc-url $(SEPOLIA_RPC_URL) \
	--etherscan-api-key $(ETHERSCAN_API_KEY) \
	--broadcast -vvvv

get-all-nfts-local:
	@forge script script/Interaction.s.sol:GetAllNfts --chain-id $(CHAIN_ID) \
	--fork-url http://127.0.0.1:8545 \
	--broadcast -vvvv

verify-token:
	@forge verify-contract $(TOKEN_CONTRACT_ADDRESS) src/Token.sol:SnowToken --verifier etherscan --chain-id $(CHAIN_ID)

verify-nft:
	@forge verify-contract $(NFT_CONTRACT_ADDRESS) src/NFT.sol:SnowNFT --verifier etherscan --chain-id $(CHAIN_ID)

verify-marketplace:
	@forge verify-contract $(MARKETPLACE_CONTRACT_ADDRESS) src/Marketplace.sol:NFTMarketplace --verifier etherscan --chain-id $(CHAIN_ID)