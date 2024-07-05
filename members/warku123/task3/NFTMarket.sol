// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTMarket is ReentrancyGuard {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
    }

    IERC20 public paymentToken;
    mapping(uint256 => Listing) public listings;
    uint256 public nextListingId;
    event NFTListed(uint256 listingId, address seller, address nftContract, uint256 tokenId, uint256 price);
    event NFTPurchased(uint256 listingId, address buyer);

    constructor(address _paymentToken) {
        paymentToken = IERC20(_paymentToken);
    }

    function listNFT(address nftContract, uint256 tokenId, uint256 price) external nonReentrant {
        require(price > 0, "Price must be greater than zero");

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        listings[nextListingId] = Listing(msg.sender, nftContract, tokenId, price);
        emit NFTListed(nextListingId, msg.sender, nftContract, tokenId, price);
        nextListingId++;
    }

    function buyNFT(uint256 listingId) external nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.price > 0, "NFT not listed for sale");

        paymentToken.transferFrom(msg.sender, listing.seller, listing.price);
        IERC721(listing.nftContract).transferFrom(address(this), msg.sender, listing.tokenId);

        emit NFTPurchased(listingId, msg.sender);
        delete listings[listingId];
    }
}
