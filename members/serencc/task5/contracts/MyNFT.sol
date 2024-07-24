// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { ERC721URIStorage, ERC721 } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFT is ERC721URIStorage {
    uint256 private _totalCount;

    constructor() ERC721("MyNFT", "MNFT") {}

    function mint(address to, string memory uri) public returns(uint256) {
        _totalCount++;
        uint256 tokenId = _totalCount;
        _mint(to, tokenId);
        _setTokenURI(tokenId, uri);

        return tokenId;
    }
}
