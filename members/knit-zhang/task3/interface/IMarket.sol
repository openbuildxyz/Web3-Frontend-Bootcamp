//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.18;

interface IMarket {
    event ListCollection(uint256 indexed tokenId, uint256 price);
    event transferCollection(address from, address indexed to, uint256 indexed tokenId);
    event UnlistCollection(uint256 indexed tokenId);

    function listCollection(address collection, uint256 tokenId, uint256 price) external;

    function buyCollection(address collection, uint256 tokenId) external;
}