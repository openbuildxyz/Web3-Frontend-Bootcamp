// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

interface IMarketplace {
    function listNFT(address nftContract, uint256 tokenId, uint256 price) external returns (uint256);
    function buyNFT(uint256 listingId) external;
}
