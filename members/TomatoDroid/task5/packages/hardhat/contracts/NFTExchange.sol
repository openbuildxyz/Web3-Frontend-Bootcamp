//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import "hardhat/console.sol";

// Author: @TomatoDroid
contract NFTExchange is ReentrancyGuard {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool isActive;
        bool isListing;
        uint time;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;

    uint256 public _nextListingId;

    mapping(uint256 => Listing) public listingIdToListings;

    IERC20 public paymentToken;

    event NFTListed(
        address indexed seller,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price
    );

    event NFTPurchased(
        address indexed buyer,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price
    );

    event NFTTakeDown(
        address indexed owner,
        address indexed nftContract,
        uint256 indexed tokenId
    );

    constructor(address _paymentToken) {
        paymentToken = IERC20(_paymentToken);
    }

    function listNFT(address _nftContract, uint256 _tokenId, uint256 _price) external {
        IERC721 nft = IERC721(_nftContract);
        console.log( "listNFT %s _tokenId %s", msg.sender, nft.ownerOf(_tokenId));
        require(nft.ownerOf(_tokenId) == msg.sender, "Not the owner of NFT");
        require(nft.isApprovedForAll(msg.sender, address(this)), "Contract not approved");

        Listing memory newListing = Listing(
            msg.sender,
            _nftContract,
            _tokenId,
            _price,
            true,
            true,
            block.timestamp
        );
        
        listings[_nftContract][_tokenId] = newListing;

        uint256 id = _nextListingId++;
        listingIdToListings[id] = newListing;

        emit NFTListed(msg.sender, _nftContract, _tokenId, _price );
    }

    function buyNFT(address _nftContract, uint256 _tokenId) external nonReentrant{
        Listing storage listing = listings[_nftContract][_tokenId];

        console.log("address _nftContract %s, uint256 _tokenId %s", _nftContract, _tokenId);

        console.log("listing.isActive %s, listing.seller %s, listing.tokenId %s", listing.isActive, listing.seller, listing.tokenId);

        require(listing.isActive, "NFT not listed for sale");
        require(listing.isListing, "NFT is taken down");

        IERC721 nft = IERC721(_nftContract);
        require(paymentToken.transferFrom(msg.sender, listing.seller, listing.price), "payment failed");

        nft.safeTransferFrom(listing.seller, msg.sender, listing.tokenId);
        listing.isActive = false;

        for (uint256 i=0;i<_nextListingId;i++) {
            Listing storage targetListing = listingIdToListings[i];
            if (targetListing.tokenId == _tokenId) {
                targetListing.isActive = false;
            }
        }
        emit NFTPurchased(listing.seller, _nftContract, _tokenId, listing.price);
    }

    function takeDownNFT(address _nftContract, uint256 _tokenId) external nonReentrant{
        IERC721 nft = IERC721(_nftContract);
        require(nft.ownerOf(_tokenId) == msg.sender, "Not the owner of NFT");

        Listing storage listing = listings[_nftContract][_tokenId];
        require(listing.isActive, "NFT not listed for sale");
        require(listing.isListing, "NFT is taken down");

        listing.isListing = false;

        for (uint256 i=0;i<_nextListingId;i++) {
            Listing storage targetListing = listingIdToListings[i];
            if (targetListing.tokenId == _tokenId) {
                targetListing.isListing = false;
            }
        }

        emit NFTTakeDown(msg.sender, _nftContract, _tokenId);
    }

    function getAllListings() public view returns(Listing[] memory) {
        Listing[] memory allListings = new Listing[](_nextListingId);
        for (uint256 i=0; i<_nextListingId;i++) {
            allListings[i] = listingIdToListings[i];
        }
        return allListings;
    }
}