// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract HexiNFT is ERC721 {
    uint256 private _nextTokenId;

    constructor() ERC721("HexiNFT", "HEXI") {}

    function mintNFT(address player) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _mint(player, tokenId);

        return tokenId;
    }
}
