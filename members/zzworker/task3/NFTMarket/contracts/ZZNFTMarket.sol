// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract ZZNFTMarket is ReentrancyGuard {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool isActive;
    }

    mapping(uint256 => Listing) public listings;
    uint256 private listingCounter;

    IERC20 public erc20Token;

    event NFTListed(uint256 listingId, address indexed seller, address indexed nftContract, uint256 indexed tokenId, uint256 price);
    event NFTPurchased(uint256 listingId, address indexed buyer, address indexed seller, address indexed nftContract, uint256 tokenId, uint256 price);

    constructor(address _erc20Token) {
        erc20Token = IERC20(_erc20Token);
    }

    function listNFT(address _nftContract, uint256 _tokenId, uint256 _price) external {
        IERC721 nft = IERC721(_nftContract);
        require(nft.ownerOf(_tokenId) == msg.sender, "You don't own this NFT");
        require(nft.isApprovedForAll(msg.sender, address(this)), "Contract is not approved");

        listingCounter++;
        listings[listingCounter] = Listing(msg.sender, _nftContract, _tokenId, _price, true);

        emit NFTListed(listingCounter, msg.sender, _nftContract, _tokenId, _price);
    }

    function buyNFT(uint256 _listingId) external nonReentrant {
        Listing storage listing = listings[_listingId];
        require(listing.isActive, "Listing is not active");
        require(erc20Token.balanceOf(msg.sender) >= listing.price, "Insufficient balance");

        listing.isActive = false;

        require(erc20Token.transferFrom(msg.sender, listing.seller, listing.price), "Token transfer failed");

        IERC721(listing.nftContract).safeTransferFrom(listing.seller, msg.sender, listing.tokenId);

        emit NFTPurchased(_listingId, msg.sender, listing.seller, listing.nftContract, listing.tokenId, listing.price);
    }
}