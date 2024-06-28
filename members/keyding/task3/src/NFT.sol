// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SnowNFT is ERC721 {
    uint256 private _nextTokenId;

    constructor() ERC721("SnowNFT", "SNOWNFT") {}

    function mint() external returns (uint256) {
        // Ensure that each newly minted NFT has a unique ID.
        uint256 newTokenId = _nextTokenId++;

        _safeMint(msg.sender, newTokenId);

        return newTokenId;
    }
}
