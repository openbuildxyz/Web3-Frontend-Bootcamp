// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract HexiNFT is ERC721URIStorage {
    uint256 private _nextTokenId;

    constructor() ERC721("HexiNFT", "HEXI") {}

    function mintNFT(
        address player,
        string memory _tokenURI
    ) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _mint(player, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        return tokenId;
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        _setTokenURI(tokenId, _tokenURI);
    }
}
