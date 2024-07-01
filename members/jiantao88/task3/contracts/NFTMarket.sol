// NFTMarket.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFTMarket {
    struct Listing {
        address nftContract;
        uint256 tokenId;
        address seller;
        uint256 price;
    }

    Listing[] public listings;
    IERC20 public acceptedToken;

    event NFTListed(address indexed seller, address indexed nftContract, uint256 indexed tokenId, uint256 price);
    event NFTPurchased(address indexed buyer, address indexed nftContract, uint256 indexed tokenId, uint256 price);

    constructor(address tokenAddress) {
        acceptedToken = IERC20(tokenAddress);
    }

    function listNFT(address nftContract, uint256 tokenId, uint256 price) public {
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        listings.push(Listing(nftContract, tokenId, msg.sender, price));
        emit NFTListed(msg.sender, nftContract, tokenId, price);
    }

    function buyNFT(uint256 index) public {
        Listing memory listing = listings[index];
        require(acceptedToken.transferFrom(msg.sender, listing.seller, listing.price), "Payment failed");
        IERC721(listing.nftContract).transferFrom(address(this), msg.sender, listing.tokenId);
        emit NFTPurchased(msg.sender, listing.nftContract, listing.tokenId, listing.price);
        delete listings[index];
    }
}
