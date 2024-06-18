// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFTMarketplace {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
    }

    Listing[] public listings;
    IERC20 public paymentToken;

    event NFTListed(address indexed seller, address indexed nftContract, uint256 indexed tokenId, uint256 price);
    event NFTPurchased(address indexed buyer, address indexed nftContract, uint256 indexed tokenId, uint256 price);

    constructor(IERC20 _paymentToken) {
        paymentToken = _paymentToken;
    }

    function listNFT(address nftContract, uint256 tokenId, uint256 price) external {
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        listings.push(Listing(msg.sender, nftContract, tokenId, price));
        emit NFTListed(msg.sender, nftContract, tokenId, price);
    }

    function buyNFT(uint256 listingId) external {
        Listing memory listing = listings[listingId];
        require(listing.price > 0, "NFT not for sale");

        paymentToken.transferFrom(msg.sender, listing.seller, listing.price);
        IERC721(listing.nftContract).transferFrom(address(this), msg.sender, listing.tokenId);

        listings[listingId] = listings[listings.length - 1];
        listings.pop();

        emit NFTPurchased(msg.sender, listing.nftContract, listing.tokenId, listing.price);
    }
}
