// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./Interface/IMarket.sol";
import "./AmazingBuildToken.sol";
import "./AmazingBuildNFT.sol";

contract NFTMarket is INFTMarket {
    uint256 _listingCounter;
    mapping(address => mapping(uint256 => Listing)) private _listings;
    uint256 _activeListings;
    uint256 _inactiveListings;

    AmazingBuildToken _paymentToken;

    constructor(AmazingBuildToken amazingBuildToken) {
        _paymentToken = amazingBuildToken;
    }

    // listing
    function listNFT(address nftContract, uint256 tokenId, uint256 price) external override {
        require(price > 0, "Price must be greater than zero");
        _listings[nftContract][_listingCounter] = Listing({
            nftContract: nftContract,
            tokenId: tokenId,
            price: price,
            seller: msg.sender,
            isActive: true
        });
        _listingCounter++;
        _activeListings++;

        emit listed(msg.sender, nftContract, tokenId, price, _listingCounter);
    }

    // purchase
    function purchaseNFT(address nftContract, uint256 listingId) external override {
        Listing storage listing = _listings[nftContract][listingId];
        require(listing.isActive, "NFT Status Error");
        require(_paymentToken.balanceOf(msg.sender) >= listing.price, "No sufficient Token");
        require(_paymentToken.transferFrom(msg.sender, listing.seller, listing.price), "Purchse failed");

        listing.isActive = false;
        _activeListings--;
        _inactiveListings++;

        AmazingBuildNFT(listing.nftContract).safeTransferFrom(listing.seller, msg.sender, listing.tokenId);

        emit purchased(msg.sender, listing.nftContract, listing.tokenId, listing.price, listingId);
    }

    // Change the status of a listing
    function changeListingStatus(address nftContract, uint256 tokenId, uint256 listingId, bool status) external override {
        Listing storage listing = _listings[nftContract][listingId];
        require(listing.seller == msg.sender, "Verification Failed");
        require(listing.nftContract == nftContract && listing.tokenId == tokenId, "Verification Failed");

        if (listing.isActive && !status) {
            _activeListings--;
            _inactiveListings++;
        } else if (!listing.isActive && status) {
            _activeListings++;
            _inactiveListings--;
        }

        listing.isActive = status;

        emit listedStatusChange(nftContract, tokenId, status, listingId);
    }

    function totalListings() external view override returns (uint256) {
        return _listingCounter;
    }

    function totalActiveListings() external view override returns (uint256) {
        return _activeListings;
    }

    function totalInactiveListings() external view override returns (uint256) {
        return _inactiveListings;
    }

    function getListing(address nftContract, uint256 listingId) external view override returns (Listing memory) {
        return _listings[nftContract][listingId];
    }
}