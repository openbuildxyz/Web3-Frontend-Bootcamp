// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract ANT is ERC721 {
    uint256 private _nextId;

    constructor() ERC721("AnderNFT", "ANT") {}

    function saftMint(address to) public {
        uint256 tokenId = _nextId++;
        _safeMint(to, tokenId);
    }
}
