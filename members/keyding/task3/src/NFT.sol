// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CavenNFT is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    constructor() ERC721("CavenNFT", "C4NFT") Ownable(msg.sender) {}

    // Only contract owners can call
    function mint(address to, string memory tokenURI) public onlyOwner returns (uint256) {
        // Ensure that each newly minted NFT has a unique ID.
        uint256 newTokenId = _nextTokenId++;

        _mint(to, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        return newTokenId;
    }
}
