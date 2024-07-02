// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTMarket {
    struct Listing {
        address seller;
        address nftAddress;
        uint256 tokenId;
        uint256 price;
    }

    Listing[] public listings;
    IERC20 public paymentToken;

    event NFTListed(address indexed seller, address indexed nftAddress, uint256 indexed tokenId, uint256 price);
    event NFTPurchased(address indexed buyer, address indexed nftAddress, uint256 indexed tokenId, uint256 price);

    constructor(address _paymentToken) {
        paymentToken = IERC20(_paymentToken);
    }

    function listNFT(address _nftAddress, uint256 _tokenId, uint256 _price) external {
        require(_price > 0, "Price must be greater than zero");
        IERC721(_nftAddress).transferFrom(msg.sender, address(this), _tokenId);

        listings.push(Listing({
            seller: msg.sender,
            nftAddress: _nftAddress,
            tokenId: _tokenId,
            price: _price
        }));

        emit NFTListed(msg.sender, _nftAddress, _tokenId, _price);
    }

    function buyNFT(uint256 _listingId) external {
        Listing storage listing = listings[_listingId];
        require(listing.price > 0, "NFT not for sale");

        paymentToken.transferFrom(msg.sender, listing.seller, listing.price);
        IERC721(listing.nftAddress).transferFrom(address(this), msg.sender, listing.tokenId);

        emit NFTPurchased(msg.sender, listing.nftAddress, listing.tokenId, listing.price);

        delete listings[_listingId];
    }
}