// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

interface INFTMarket {
    struct Listing {
        address nftContract;
        uint256 tokenId;
        uint256 price;
        address seller;
        bool isActive;
    }

    event listed(address seller, address nftContract, uint256 tokenId, uint256 price, uint256 listingId);

    event purchased(address  buyer, address nftContract, uint256 tokenId, uint256 price, uint256 listingId);

    event listedStatusChange(address nftContract, uint256 tokenId, bool listingStatus, uint256 listingId);

    function listNFT(address nftContract, uint256 tokenId, uint256 price) external;

    function purchaseNFT(address nftContract, uint256 listingId) external;

    function changeListingStatus(address nftContract, uint256 tokenId, uint256 listingId, bool status) external;

    function totalListings() external view returns (uint256);
    
    function totalActiveListings() external  view returns (uint256);

    function totalInactiveListings() external  view returns (uint256);

    function getListing(address nftContract, uint256 listingId) external view returns (Listing memory);
}