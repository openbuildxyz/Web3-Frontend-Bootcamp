// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract NFTExchange is ReentrancyGuard{

    struct Listing {
        address  seller;
        address nftContract; // address of the NFT contract
        uint256 tokenId; // token ID of the NFT
        uint256 price;
        bool isActive;
    }

    // Mapping to store all NFT listings
    // First key is the NFT contract address, second key is the Token ID
    mapping(address=> mapping(uint256 => Listing)) public listings;
    IERC20 public paymentToken;

    event NFTListed(address indexed seller, address indexed nftContract, uint256 indexed tokenId, uint256 price);
    event NFTPurchased(address indexed buyer, address indexed nftContract, uint256 indexed tokenId, uint256 price);
    event ListingCancelled(address indexed seller, address indexed nftContract, uint256 indexed tokenId);
    event ListingPriceUpdated(address indexed seller, address indexed nftContract, uint256 indexed tokenId, uint256 newPrice);


    // Initialize the payment token to be used in the marketplace.
    constructor(address _paymentToken) {
        paymentToken = IERC20(_paymentToken);
    }

    function listNFT(address _nftContract, uint256 _tokenId, uint256 _price) external {
        IERC721 nft = IERC721(_nftContract);
        require(nft.ownerOf(_tokenId) == msg.sender, "Not the owner of the NFT");
        require(nft.isApprovedForAll(msg.sender, address(this)),"Contract not approved");
        
        listings[_nftContract][_tokenId] = Listing({
            seller: msg.sender,
            nftContract: _nftContract,
            tokenId: _tokenId,
            price: _price,
            isActive: true
        });
        emit NFTListed(msg.sender, _nftContract, _tokenId, _price);
    }

    // Retrieves the listing details for a specific NFT. This is a view function
    function getListingDetails(address _nftContract, uint256 _tokenId) external view returns (Listing memory) {
        return listings[_nftContract][_tokenId];
    }

    function cancelListing(address _nftContract, uint256 _tokenId) external {
        Listing storage listing = listings[_nftContract][_tokenId];
        require(listing.isActive, "NFT not listed");
        require(listing.seller == msg.sender, "Not the seller");

        listing.isActive = false;
        emit ListingCancelled(msg.sender, _nftContract, _tokenId);
    }

    function updateListingPrice(address _nftContract, uint256 _tokenId, uint256 _newPrice) external {
        Listing storage listing = listings[_nftContract][_tokenId];
        require(listing.isActive, "NFT not listed");
        require(listing.seller == msg.sender, "Not the seller");

        listing.price = _newPrice;
        emit ListingPriceUpdated(msg.sender, _nftContract, _tokenId, _newPrice);
    }


    function buyNFT(address _nftContract, uint256 _tokenId) external nonReentrant {
        Listing storage listing = listings[_nftContract][_tokenId];
        require(listing.isActive,"NFT not listed for sale");

        IERC721 nft = IERC721(_nftContract);
        require(paymentToken.transferFrom(msg.sender, listing.seller, listing.price),"Payment failed");

        nft.safeTransferFrom(listing.seller, msg.sender, _tokenId);

        listing.isActive = false;

        emit NFTPurchased(msg.sender, _nftContract, _tokenId, listing.price);
    }
}