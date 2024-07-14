#!/bin/bash
graph init --studio openbuild-nftmarket \
    --network=sepolia \
    --protocol=ethereum \
    --from-contract=0x610a95b0f300e69Df7ad987AE333E74B2BA42758 \
    --abi=./abis/NFTMarket.json
