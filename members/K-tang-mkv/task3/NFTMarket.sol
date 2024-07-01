// NFTMarket.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarket is Ownable {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
    }

    Listing[] public listings;
    IERC20 public paymentToken;

    event NFTListed(uint256 indexed listingId, address indexed seller, address indexed nftContract, uint256 tokenId, uint256 price);
    event NFTPurchased(uint256 indexed listingId, address indexed buyer, address indexed nftContract, uint256 tokenId, uint256 price);

    constructor(address _paymentToken) Ownable(msg.sender) {
        paymentToken = IERC20(_paymentToken);
    }

    function listNFT(address nftContract, uint256 tokenId, uint256 price) public {
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        listings.push(Listing(msg.sender, nftContract, tokenId, price));
        emit NFTListed(listings.length - 1, msg.sender, nftContract, tokenId, price);
    }

    function purchaseNFT(uint256 listingId) public {
        Listing storage listing = listings[listingId];
        require(paymentToken.transferFrom(msg.sender, listing.seller, listing.price), "Payment failed");

        IERC721(listing.nftContract).transferFrom(address(this), msg.sender, listing.tokenId);
        emit NFTPurchased(listingId, msg.sender, listing.nftContract, listing.tokenId, listing.price);

        delete listings[listingId];
    }

    function getListings() public view returns (Listing[] memory) {
        return listings;
    }
}
