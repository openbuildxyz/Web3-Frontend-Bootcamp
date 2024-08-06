// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface INFTMarket {
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

    function listNFT(address _nftContract, uint256 _tokenId, uint256 _price) external;
    function buyNFT(address _nftContract, uint256 _tokenId) external;
}
