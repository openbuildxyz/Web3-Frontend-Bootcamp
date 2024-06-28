//  SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "forge-std/Script.sol";
import "../src/Token.sol";
import "../src/NFT.sol";
import "../src/Marketplace.sol";

contract MintNFT is Script {
    function run() external {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(privateKey);

        address nftContract = vm.envAddress("NFT_CONTRACT_ADDRESS");
        SnowNFT nft = SnowNFT(nftContract);

        console.log("Minting NFT...");
        uint256 tokenId = nft.mint();
        console.log("Minted NFT with tokenId:", tokenId);

        vm.stopBroadcast();
    }
}

contract ListNFT is Script {
    // == Logs == After minting the NFT, get the tokenId
    uint256 tokenId = 0;

    function run() external {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(privateKey);

        address nftContract = vm.envAddress("NFT_CONTRACT_ADDRESS");
        address marketplaceContract = vm.envAddress("MARKETPLACE_CONTRACT_ADDRESS");

        IERC721 nft = IERC721(nftContract);
        NFTMarketplace marketplace = NFTMarketplace(marketplaceContract);

        console.log("Approve marketplace operable this NFT ...");
        nft.setApprovalForAll(address(marketplace), true);

        console.log("Listing NF...");
        uint256 listingPrice = 10 * 10 ** 18;
        uint256 listingId = marketplace.listNFT(nftContract, tokenId, "carrot", listingPrice);
        console.log("Listed NFT with listingId: ", listingId);

        NFTMarketplace.NftInfo[] memory allNfts = marketplace.getAllNfts();
        console.log("All Nfts: ", allNfts.length);

        vm.stopBroadcast();
    }
}

contract DelistNFT is Script {
    // == Logs == After minting the NFT, get the tokenId
    uint256 listingId = 0;

    function run() external {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(privateKey);

        address nftContract = vm.envAddress("NFT_CONTRACT_ADDRESS");
        address marketplaceContract = vm.envAddress("MARKETPLACE_CONTRACT_ADDRESS");

        IERC721 nft = IERC721(nftContract);
        NFTMarketplace marketplace = NFTMarketplace(marketplaceContract);

        console.log("Approve marketplace operable this NFT ...");
        nft.setApprovalForAll(address(marketplace), true);

        console.log("Delisting NFT...");
        marketplace.delistNFT(listingId);

        NFTMarketplace.NftInfo memory listedNft = marketplace.getListedNft(listingId);
        console.log("isListed", listedNft.isListed);

        vm.stopBroadcast();
    }
}

contract RelistNFT is Script {
    // == Logs == After listing the NFT, get the listingId
    uint256 listingId = 0;

    function run() external {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(privateKey);

        address nftContract = vm.envAddress("NFT_CONTRACT_ADDRESS");
        address marketplaceContract = vm.envAddress("MARKETPLACE_CONTRACT_ADDRESS");

        IERC721 nft = IERC721(nftContract);
        NFTMarketplace marketplace = NFTMarketplace(marketplaceContract);

        console.log("Approve marketplace operable this NFT ...");
        nft.setApprovalForAll(address(marketplace), true);

        console.log("Listing NFT...");
        uint256 newListingPrice = 20 * 10 ** 18;
        uint256 keepListingId = marketplace.listNFT(listingId, newListingPrice);
        console.log("Listed NFT with listingId: ", keepListingId, listingId);

        NFTMarketplace.NftInfo memory listedNft = marketplace.getListedNft(listingId);
        console.log("isListed", listedNft.isListed);

        vm.stopBroadcast();
    }
}

contract BuyNFT is Script {
    // == Logs == After listing the NFT, get the listingID
    uint256 listingId = 0;
    // After relisting new price
    uint256 listPrice = 20 * 10 ** 18;

    function run() external {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(privateKey);

        address tokenContract = vm.envAddress("TOKEN_CONTRACT_ADDRESS");
        address marketplaceContract = vm.envAddress("MARKETPLACE_CONTRACT_ADDRESS");

        IERC20 token = IERC20(tokenContract);
        NFTMarketplace marketplace = NFTMarketplace(marketplaceContract);

        console.log("Approve marketplace contract can transfer tokens.");
        token.approve(marketplaceContract, listPrice);

        NFTMarketplace.NftInfo memory buyNft = marketplace.getListedNft(listingId);
        console.log("#", listingId, "nft has been listed:", buyNft.isListed);
        console.log("#", listingId, "nft has been sold:", buyNft.isSold);

        console.log("Buying NFT...");
        marketplace.buyNFT(listingId);
        console.log("Buy NFT completed.");

        NFTMarketplace.NftInfo memory afterBuyNft = marketplace.getListedNft(listingId);
        console.log("#", listingId, "nft has been listed:", afterBuyNft.isListed);
        console.log("#", listingId, "nft has been sold:", afterBuyNft.isSold);

        vm.stopBroadcast();
    }
}

contract GetAllNfts is Script {
    function run() external view {
        address marketplaceContract = vm.envAddress("MARKETPLACE_CONTRACT_ADDRESS");
        NFTMarketplace marketplace = NFTMarketplace(marketplaceContract);

        NFTMarketplace.NftInfo[] memory allNfts = marketplace.getAllNfts();
        console.log("All NFTs:", allNfts.length, "\n");

        for (uint256 i = 0; i < allNfts.length; i++) {
            console.log("tokenId:", allNfts[i].tokenId, "listingId:", allNfts[i].listingId);
            console.log("isListed:", allNfts[i].isListed);
            console.log("owner", allNfts[i].owner);
            console.log("isSold:", allNfts[i].isSold, "price", allNfts[i].price);
            console.log();
        }
    }
}
