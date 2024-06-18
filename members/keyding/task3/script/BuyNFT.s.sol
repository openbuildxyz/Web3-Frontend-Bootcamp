// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Script.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../src/IMarketplace.sol";

contract BuyNFT is Script {
    // == Logs == After listing the NFT, get the listingID
    uint256 listingId = 0;
    uint256 listPrice = 10 * 10 ** 18;

    function run() external {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(privateKey);

        address tokenContract = vm.envAddress("TOKEN_CONTRACT_ADDRESS");
        address marketplaceContract = vm.envAddress("MARKETPLACE_CONTRACT_ADDRESS");

        IERC20 token = IERC20(tokenContract);
        IMarketplace marketplace = IMarketplace(marketplaceContract);

        console.log("Approve marketplace contract can transfer tokens.");
        token.approve(marketplaceContract, listPrice);

        console.log("Buying NFT...");
        marketplace.buyNFT(listingId);
        console.log("Buy NFT completed.");

        vm.stopBroadcast();
    }
}
