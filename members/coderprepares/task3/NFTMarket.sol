// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarket is Ownable {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
    }

    IERC20 public paymentToken;
    mapping(address => mapping(uint256 => Listing)) public listings;

    event NFTListed(address seller, address nftContract, uint256 tokenId, uint256 price);
    event NFTPurchased(address buyer, address nftContract, uint256 tokenId, uint256 price);

    constructor(IERC20 _paymentToken, address initialOwner) Ownable(initialOwner) {
        paymentToken = _paymentToken;
    }

    function listNFT(address nftContract, uint256 tokenId, uint256 price) external {
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        listings[nftContract][tokenId] = Listing(msg.sender, nftContract, tokenId, price);

        emit NFTListed(msg.sender, nftContract, tokenId, price);
    }

    function buyNFT(address nftContract, uint256 tokenId) external {
        Listing memory listing = listings[nftContract][tokenId];
        require(listing.price > 0, "NFT not listed");

        paymentToken.transferFrom(msg.sender, listing.seller, listing.price);
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);

        delete listings[nftContract][tokenId];

        emit NFTPurchased(msg.sender, nftContract, tokenId, listing.price);
    }
}
