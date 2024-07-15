#!/bin/bash
graph init --studio openbuild-nftmarket \
    --network=sepolia \
    --protocol=ethereum \
    --from-contract=0xEE9e3a49eCA927933Ef08c742ce2E0a89bEDd419 \
    --abi=NFTMarket.json
