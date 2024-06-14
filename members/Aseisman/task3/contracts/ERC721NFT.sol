// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CargoXNFT is ERC721 {
    uint256 private _nextTokenId;

    constructor() ERC721("CargoXNFT", "MTK") {}

    function mintNFT(address player) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;//每次tokenId++,
        _mint(player, tokenId);
        return tokenId;
    }
}