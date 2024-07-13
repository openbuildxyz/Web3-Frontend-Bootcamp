// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) Ownable(msg.sender) {
        tokenCounter = 0;
    }

    function createNFT(
        string memory tokenURI
    ) public onlyOwner returns (uint256) {
        uint256 newItemId = tokenCounter;

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        tokenCounter += 1;

        return newItemId;
    }
}
