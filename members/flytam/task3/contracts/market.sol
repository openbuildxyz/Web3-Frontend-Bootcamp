// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Author: @flytam https://github.com/flytam
contract NFTMarket {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
    }

    IERC20 public paymentToken;
    mapping(uint256 => Listing) public listings;
    uint256 public listingCounter;

    event NFTListed(uint256 indexed listingId, address indexed seller, address indexed nftContract, uint256 tokenId, uint256 price);
    event NFTPurchased(uint256 indexed listingId, address indexed buyer, address indexed nftContract, uint256 tokenId, uint256 price);

    constructor(address _paymentToken) {
        paymentToken = IERC20(_paymentToken);
    }

    function listNFT(address nftContract, uint256 tokenId, uint256 price) public {
        require(price > 0, "Price must be greater than zero");
        require(IERC721(nftContract).ownerOf(tokenId) == msg.sender, "Caller is not the owner of the NFT");
        require(IERC721(nftContract).getApproved(tokenId) == address(this), "Market is not approved to transfer this NFT");

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        listings[listingCounter] = Listing({
            seller: msg.sender,
            nftContract: nftContract,
            tokenId: tokenId,
            price: price
        });

        emit NFTListed(listingCounter, msg.sender, nftContract, tokenId, price);
        listingCounter++;
    }

    function purchaseNFT(uint256 listingId) public {
        Listing storage listing = listings[listingId];

        require(listing.price > 0, "NFT not listed");
        require(paymentToken.transferFrom(msg.sender, listing.seller, listing.price), "Payment failed");

        IERC721(listing.nftContract).transferFrom(address(this), msg.sender, listing.tokenId);

        emit NFTPurchased(listingId, msg.sender, listing.nftContract, listing.tokenId, listing.price);

        delete listings[listingId];
    }

    function getAllListings() public view returns (Listing[] memory) {
        Listing[] memory result = new Listing[](listingCounter);
        for (uint256 i = 0; i < listingCounter; i++) {
            result[i] = listings[i];
        }
        return result;
    }
}