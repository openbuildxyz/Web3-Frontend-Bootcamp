// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    uint256 private _nextTokenId;

    constructor() ERC721("LakeNFT", "LKN") {}

    function mintNFT(address recipient) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _mint(recipient, _nextTokenId);
        return tokenId;
    }
}
