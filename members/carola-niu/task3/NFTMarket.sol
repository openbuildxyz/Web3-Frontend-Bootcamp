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
        string tokenUrl;
        uint256 price;
        bool isActivated;
    }

   
    uint256 public listingCounter;
    IERC20 public paymentToken;

    mapping(address => mapping(uint256 => Listing)) public Listings;

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

    event NFTUnlisted(
        address indexed seller,
        address indexed nftContract,
        uint256 indexed tokenId
    );

    constructor (address _paymentToken) {
        paymentToken = IERC20(_paymentToken);
    }

    function isActivated(address _nftContract, uint256 _tokenId) external view returns (bool) {
        return Listings[_nftContract][_tokenId].isActivated;
    }

    function ListingNFT (address _nftContract, uint256 _tokenId, string memory _tokenUrl, uint256 _price) external {
        IERC721 nft = IERC721(_nftContract);
        require(nft.ownerOf(_tokenId) == msg.sender, "You are not the owner of this NFT");
        require(_price > 0, "Price must be greater than 0");
        require(nft.isApprovedForAll(msg.sender, address(this)), "Marketplace is not approved to transfer this NFT");

        Listings[_nftContract][_tokenId] = Listing(
            msg.sender,
            _nftContract,
            _tokenId,
            _tokenUrl,
            _price,
            true
        );

        emit NFTListed(msg.sender, _nftContract, _tokenId, _price);
        listingCounter++;
    }

    function buyingNFT (address _nftContract, uint256 _tokenId) external nonReentrant {
        Listing storage listing = Listings[_nftContract][_tokenId];
        require(listing.isActivated, "This NFT is not for sale!");

        IERC721 nft = IERC721(_nftContract);
        address buyer = msg.sender;
        require(paymentToken.transferFrom(buyer, listing.seller, listing.price), "Payment failed");
        nft.safeTransferFrom(listing.seller, buyer, _tokenId);
        listing.isActivated = false;
        emit NFTPurchased(listing.seller, msg.sender, _tokenId, listing.price);
    }

    function getAllListing() public view returns (Listing[] memory) {
        Listing[] memory allListing = new Listing[] (listingCounter);
        uint256 counter = 0;
        for (uint256 i = 0; i < listingCounter; i++) {
            if (Listings[msg.sender][i].isActivated) {
                allListing[counter] = Listings[msg.sender][i];
                counter++;
            }
        }
        return allListing;
    }


    function unlistNFT (address _nftContract, uint256 _tokenId) external {
        IERC721 nft = IERC721(_nftContract);
        require(nft.ownerOf(_tokenId) == msg.sender, "You are not the owner of this NFT");
        require(nft.isApprovedForAll(msg.sender, address(this)), "Marketplace is not approved to transfer this NFT");
        require(Listings[_nftContract][_tokenId].isActivated, "This NFT is not for sale!");

        Listings[_nftContract][_tokenId].isActivated = false;

        emit NFTUnlisted(msg.sender, _nftContract, _tokenId);
    }
}
