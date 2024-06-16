// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract NFTMarket is ReentrancyGuard {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool isActivated;
    }

    mapping (address => mapping(uint256 => Listing)) public Listings; 
    uint256 public listingCounter;
    IERC20 public paymentToken;

    event NFTListed(
        address indexed seller,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price
    );

    event NFTPurchased(
        address indexed seller,
        address indexed buyer,
        uint256 tokenId,
        uint256 price
    );

    constructor (address _paymentToken) {
        paymentToken = IERC20(_paymentToken);
    }

    function ListingNFT (address _nftContract, uint256 _tokenId, uint256 _price) public {
        IERC721 nft = IERC721(_nftContract);
        require(nft.ownerOf(_tokenId) == msg.sender, "You are not the owner of this NFT");
        require(nft.isApprovedForAll(msg.sender, address(this)), "Marketplace is not approved to transfer this NFT");

        Listings[_nftContract][_tokenId] = Listing(
            msg.sender,
            _nftContract,
            _tokenId,
            _price,
            true
        );

        emit NFTListed(msg.sender, _nftContract, _tokenId, _price);
        listingCounter++;
    }

    function buyingNFT (address _nftContract, uint256 _tokenId) public nonReentrant {
        Listing storage listing = Listings[_nftContract][_tokenId];
        require(listing.isActivated, "This NFT is not for sale!");

        IERC721 nft = IERC721(_nftContract);
        require(paymentToken.transferFrom(msg.sender, listing.seller, listing.price), "Payment failed");
        nft.safeTransferFrom(listing.seller, msg.sender, _tokenId);
        listing.isActivated = false;
        emit NFTPurchased(listing.seller, msg.sender, _tokenId, listing.price);
    }
}
