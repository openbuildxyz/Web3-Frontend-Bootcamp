// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract CustomNFT is ERC721URIStorage {
    uint256 public tokenCounter;
    constructor() ERC721("CustomNFT", "CNFT") {
        tokenCounter = 0;
    }

    function createNFT(string memory tokenURI) public payable returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _safeMint(msg.sender,newTokenId);
        _setTokenURI(newTokenId,tokenURI);
        tokenCounter++;
        return newTokenId;
    }
}