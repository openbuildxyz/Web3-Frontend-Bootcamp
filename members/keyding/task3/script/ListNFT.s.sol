// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Script.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../src/IMarketplace.sol";

contract ListNFT is Script {
    // == Logs == After minting the NFT, get the tokenId
    uint256 tokenId = 0;

    function run() external {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(privateKey);

        address nftContract = vm.envAddress("NFT_CONTRACT_ADDRESS");
        address marketplaceContract = vm.envAddress("MARKETPLACE_CONTRACT_ADDRESS");

        IERC721 nft = IERC721(nftContract);
        IMarketplace marketplace = IMarketplace(marketplaceContract);

        console.log("Approve marketplace contract can transfer this NFT ...");
        nft.approve(marketplaceContract, tokenId);

        console.log("Listing NFT...");
        uint256 listingPrice = 10 * 10 ** 18;
        uint256 listingId = marketplace.listNFT(nftContract, tokenId, listingPrice);
        console.log("Listed NFT with listingId: ", listingId);

        vm.stopBroadcast();
    }
}
