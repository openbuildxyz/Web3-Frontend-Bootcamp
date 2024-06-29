// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarket {

    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool sold;
        string tokenURI;
        uint256 timestamp; // New field for listing timestamp
    }

    mapping(uint256 => Listing) public listings;
    uint256[] public listingIds;
    uint256 public listingCount;
    IERC20 public paymentToken;

    event NFTListed(
        uint256 indexed listingId,
        address indexed seller,
        address indexed nftContract,
        uint256 tokenId,
        uint256 price,
        uint256 timestamp // Include timestamp in the event
    );
    event NFTPurchased(
        uint256 indexed listingId,
        address indexed buyer,
        address indexed nftContract,
        uint256 tokenId,
        uint256 price
    );
    event NFTDelisted(
        uint256 indexed listingId,
        address indexed seller,
        address indexed nftContract,
        uint256 tokenId
    );

    constructor(address _paymentToken) {
        paymentToken = IERC20(_paymentToken);
    }

    function listNFT(address nftContract, uint256 tokenId, uint256 price) external {
        IERC721Metadata nft = IERC721Metadata(nftContract);
        require(nft.ownerOf(tokenId) == msg.sender, "NFTMarketplace: Not the owner of the NFT");
        require(nft.getApproved(tokenId) == address(this) || nft.isApprovedForAll(msg.sender, address(this)), "NFTMarketplace: Marketplace not approved");

        string memory tokenURI = nft.tokenURI(tokenId);
        nft.transferFrom(msg.sender, address(this), tokenId);

        listings[listingCount] = Listing({
            seller: msg.sender,
            nftContract: nftContract,
            tokenId: tokenId,
            price: price,
            sold: false,
            tokenURI: tokenURI,
            timestamp: block.timestamp 
        });
        listingIds.push(listingCount);

        emit NFTListed(listingCount, msg.sender, nftContract, tokenId, price, block.timestamp);
        listingCount++;
    }

    function purchaseNFT(uint256 listingId) external {
        Listing storage listing = listings[listingId];
        require(!listing.sold, "NFTMarketplace: NFT already sold");
        require(paymentToken.balanceOf(msg.sender) >= listing.price, "NFTMarketplace: Insufficient token balance");
        require(paymentToken.allowance(msg.sender, address(this)) >= listing.price, "NFTMarketplace: Insufficient token allowance");

        require(paymentToken.transferFrom(msg.sender, listing.seller, listing.price), "NFTMarketplace: Payment failed");

        IERC721(listing.nftContract).transferFrom(address(this), msg.sender, listing.tokenId);
        listing.sold = true;

        emit NFTPurchased(listingId, msg.sender, listing.nftContract, listing.tokenId, listing.price);
    }

    function delistNFT(uint256 listingId) external {
        Listing storage listing = listings[listingId];
        require(msg.sender == listing.seller, "NFTMarketplace: Only seller can delist");
        require(!listing.sold, "NFTMarketplace: NFT already sold");

        IERC721(listing.nftContract).transferFrom(address(this), listing.seller, listing.tokenId);
        listing.sold = true;

        emit NFTDelisted(listingId, msg.sender, listing.nftContract, listing.tokenId);
    }

    function getListing(uint256 listingId) external view returns (Listing memory) {
        return listings[listingId];
    }

    function getAllListings() external view returns (Listing[] memory) {
        Listing[] memory allListings = new Listing[](listingIds.length);
        for (uint256 i = 0; i < listingIds.length; i++) {
            allListings[i] = listings[listingIds[i]];
        }
        return allListings;
    }
}