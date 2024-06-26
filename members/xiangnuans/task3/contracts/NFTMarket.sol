// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTMarket {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
    }

    Listing[] public listings;
    IERC20 public paymentToken;

    event NFTListed(
        address indexed seller,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price
    );
    event NFTBought(
        address indexed buyer,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price
    );

    constructor(IERC20 _paymentToken) {
        paymentToken = _paymentToken;
    }

    function listNFT(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public {
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        listings.push(Listing(msg.sender, nftContract, tokenId, price));
        emit NFTListed(msg.sender, nftContract, tokenId, price);
    }

    function getAllListings() external view returns (Listing[] memory) {
        return listings;
    }

    function buyNFT(uint256 index) external {
        Listing storage listing = listings[index];
        require(listing.price > 0, "NFT not for sale");

        paymentToken.transferFrom(msg.sender, listing.seller, listing.price);
        IERC721(listing.nftContract).transferFrom(
            address(this),
            msg.sender,
            listing.tokenId
        );

        emit NFTBought(
            msg.sender,
            listing.nftContract,
            listing.tokenId,
            listing.price
        );

        delete listings[index];
    }
}
