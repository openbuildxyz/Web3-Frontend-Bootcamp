// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// contract hash 0xefccb0647b830d48eabe4f875a65355a305e8c8a

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

    // paymentToken 是一个 IERC20 类型的变量，用于表示在 NFT 市场中使用的 ERC20 代币。这个代币将用于支付购买 NFT 的费用。它的主要作用是确保买家在购买 NFT 时使用特定的 ERC20 代币进行支付，而不是使用其他代币或原生加密货币
    IERC20 public paymentToken;
    uint256 public listingCounter;
    mapping(uint256 => Listing) public listings;

    event NFTListed(uint256 indexed listingId, address indexed seller, address indexed nftContract, uint256 tokenId, uint256 price);
    event NFTPurchased(uint256 indexed listingId, address indexed buyer, address indexed nftContract, uint256 tokenId, uint256 price);

    constructor(IERC20 _paymentToken) Ownable(msg.sender) {
        paymentToken = _paymentToken;
    }

    function listNFT(address nftContract, uint256 tokenId, uint256 price) public {
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
        Listing memory listing = listings[listingId];
        require(listing.price > 0, "NFT not listed for sale");

        paymentToken.transferFrom(msg.sender, listing.seller, listing.price);
        IERC721(listing.nftContract).transferFrom(address(this), msg.sender, listing.tokenId);

        emit NFTPurchased(listingId, msg.sender, listing.nftContract, listing.tokenId, listing.price);

        delete listings[listingId];
    }

}

// listNFT 交易哈希: 0x500c6a49dd5eff57f42c81b6071af6607dcf0b36f9f31a9d274a583c8a1f021b
// purchaseNFT 交易哈希: 0xcd58261ba817a83057ce8276daeff3c0d03c722a1430f550a39461e19c110e8d