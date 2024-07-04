// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTExchange is ReentrancyGuard {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool isActive;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;
    IERC20 public paymentToken;

    event NFTListed (
        address indexed seller,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price
    );

    event NFTPurchased (
        address indexed buyer,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price
    );

    event NFTDeListed (
        address indexed owner,
        address indexed nftContract,
        uint256 indexed tokenId
    );

    constructor(address _paymentToken) {
        paymentToken = IERC20(_paymentToken);
    }

    function listNFT(address _nftContract, uint256 _tokenId, uint256 _price) external {
        IERC721 nft = IERC721(_nftContract);
        require(nft.ownerOf(_tokenId) == msg.sender, "NFT owner error");
        require(nft.isApprovedForAll(msg.sender, address(this)), "NFT approve fail");

        listings[_nftContract][_tokenId] = Listing (
            msg.sender,
            _nftContract,
            _tokenId,
            _price,
            true
        );

        emit NFTListed(msg.sender, _nftContract, _tokenId, _price);
    }

    function buyNFT(address _nftContract, uint256 _tokenId) external nonReentrant {
        Listing storage listing = listings[_nftContract][_tokenId];
        require(listing.isActive, "NFT not listed for sale");

        IERC721 nft = IERC721(_nftContract);
        require(paymentToken.transferFrom(msg.sender, listing.seller, listing.price), "Payment failed");
        
        nft.safeTransferFrom(listing.seller, msg.sender, _tokenId);

        listing.isActive = false;

        emit NFTPurchased(msg.sender, _nftContract, _tokenId, listing.price);
    }

    function delistNFT(address _nftContract, uint256 _tokenId) external {
        IERC721 nft = IERC721(_nftContract);
        require(nft.ownerOf(_tokenId) == msg.sender, "NFT owner error");
        require(nft.isApprovedForAll(msg.sender, address(this)), "NFT approve fail");

        listings[_nftContract][_tokenId].isActive = false;

        emit NFTDeListed(msg.sender, _nftContract, _tokenId);
    }
}
