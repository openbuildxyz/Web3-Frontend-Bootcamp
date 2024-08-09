// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarket is Ownable {
    struct Listing {
        address seller;
        uint256 price;
    }

    IERC20 public erc20Token;
    mapping(address => mapping(uint256 => Listing)) public listings;

    event NFTListed(address indexed nftContract, uint256 indexed tokenId, uint256 price, address seller);
    event NFTPurchased(address indexed nftContract, uint256 indexed tokenId, uint256 price, address buyer);

    constructor(IERC20 _erc20Token, address initialOwner) Ownable(initialOwner) {
        erc20Token = _erc20Token;
    }

    function listNFT(address nftContract, uint256 tokenId, uint256 price) public {
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        listings[nftContract][tokenId] = Listing(msg.sender, price);
        emit NFTListed(nftContract, tokenId, price, msg.sender);
    }

    function buyNFT(address nftContract, uint256 tokenId) public {
        Listing memory listing = listings[nftContract][tokenId];
        require(listing.price > 0, "NFT not listed for sale");
        require(erc20Token.transferFrom(msg.sender, listing.seller, listing.price), "Payment failed");

        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        delete listings[nftContract][tokenId];
        emit NFTPurchased(nftContract, tokenId, listing.price, msg.sender);
    }
}