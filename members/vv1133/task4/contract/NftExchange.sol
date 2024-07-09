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
        string url;
        uint256 timestamp;
        bool isActive;
    }

    struct NFTItem {
        address nftContract;
        uint256 tokenId;
    }

    NFTItem[] private allItems;
    mapping(address => mapping(uint256 => Listing)) private listings;
    mapping(address => mapping(uint256 => bool)) private listedFlags;
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

    function listNFT(address _nftContract, uint256 _tokenId, uint256 _price, string memory _url) external {
        IERC721 nft = IERC721(_nftContract);
        require(nft.ownerOf(_tokenId) == msg.sender, "NFT owner error");
        require(nft.isApprovedForAll(msg.sender, address(this)), "NFT approve fail");

        bool nftListed = listedFlags[_nftContract][_tokenId];
        if (nftListed) {
            listings[_nftContract][_tokenId].seller = msg.sender;
            listings[_nftContract][_tokenId].price = _price;
            listings[_nftContract][_tokenId].timestamp = block.timestamp;
            listings[_nftContract][_tokenId].isActive = true;
        } else {
            listings[_nftContract][_tokenId] = Listing (
                msg.sender,
                _nftContract,
                _tokenId,
                _price,
                _url,
                block.timestamp,
                true
            );
            listedFlags[_nftContract][_tokenId] = true;
            allItems.push(NFTItem(_nftContract, _tokenId));
        }

        emit NFTListed(msg.sender, _nftContract, _tokenId, _price);
    }

    function buyNFT(address _nftContract, uint256 _tokenId) external nonReentrant {
        Listing storage listing = listings[_nftContract][_tokenId];
        require(listing.isActive, "NFT not listed for sale");

        IERC721 nft = IERC721(_nftContract);
        require(paymentToken.transferFrom(msg.sender, listing.seller, listing.price), "Payment failed");
        
        nft.safeTransferFrom(listing.seller, msg.sender, _tokenId);

        listing.seller = msg.sender;
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

    function getAll() external view returns (Listing[] memory) {
        Listing[] memory allListings = new Listing[](allItems.length);
        NFTItem memory nftItem;

        for (uint256 i = 0; i < allItems.length; i++) {
            nftItem = allItems[i];
            allListings[i] = listings[nftItem.nftContract][nftItem.tokenId];
        }

        return allListings;
    }
}
