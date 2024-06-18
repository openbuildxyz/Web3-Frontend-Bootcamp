// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Script.sol";
import "../src/INFT.sol";

contract MintNFT is Script {
    function run() external {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        address owner = vm.addr(privateKey);

        vm.startBroadcast(privateKey);

        address nftContract = vm.envAddress("NFT_CONTRACT_ADDRESS");
        INFT nft = INFT(nftContract);

        console.log("Minting NFT...");
        string memory tokenURI = "https://caven.dev";
        uint256 tokenId = nft.mint(owner, tokenURI);
        console.log("Minted NFT with tokenId:", tokenId);

        vm.stopBroadcast();
    }
}
