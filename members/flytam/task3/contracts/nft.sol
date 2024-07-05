// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from '@openzeppelin/contracts/token/ERC721/ERC721.sol';
// import "@openzeppelin/contracts/access/Ownable.sol";

// Author: @flytam https://github.com/flytam
contract BytedanceNFT is ERC721  {
    uint256 private _nextTokenId;

    constructor() ERC721("BytedanceNFT", "BDM")  {}

    function mintNFT(address player)
        public
        returns (uint256)
    {
        uint256 tokenId = _nextTokenId++;
        _mint(player, tokenId);

        return tokenId;
    }
}