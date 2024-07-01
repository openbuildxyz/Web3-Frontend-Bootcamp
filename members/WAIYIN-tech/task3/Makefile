-include .env

.PHONY: test deploy mintToken approveToken mintNft launch buy

test: 
	forge test
deploy:
	forge script script/DeployMarket.s.sol:DeployMarket --rpc-url ${RPC_URL} --private-key ${PRIVATE_KEY} --broadcast
	forge script script/DeployWNft.s.sol:DeployWNft --rpc-url ${RPC_URL} --private-key ${PRIVATE_KEY} --broadcast
mintToken:
	TARGET_ADDRESS=$(target) AMOUNT=$(amount) forge script script/Interactions.s.sol:MintToken --rpc-url ${RPC_URL} --private-key ${PRIVATE_KEY} --broadcast
approveToken:
	TARGET_ADDRESS=$(marketAddress) AMOUNT=$(amount) forge script script/Interactions.s.sol:ApproveToken --rpc-url ${RPC_URL} --private-key ${PRIVATE_KEY} --broadcast
register:
	TARGET_ADDRESS=$(sellerAddress) forge script script/Interactions.s.sol:RegisterNftSeller --rpc-url ${RPC_URL} --private-key ${PRIVATE_KEY} --broadcast
mintNft:
	TARGET_ADDRESS=$(marketAddress) forge script script/Interactions.s.sol:MintNFT --rpc-url ${RPC_URL} --private-key ${PRIVATE_KEY} --broadcast
launch:
	TOKEN_ID=$(tokenId) PRICE=$(price) forge script script/Interactions.s.sol:Launch --rpc-url ${RPC_URL} --private-key ${PRIVATE_KEY} --broadcast
buy:
	TOKEN_ID=$(tokenId) forge script script/Interactions.s.sol:Buy --rpc-url ${RPC_URL} --private-key ${PRIVATE_KEY} --broadcast