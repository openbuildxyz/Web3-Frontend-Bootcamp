// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFT is ERC721URIStorage {
    uint256 private _tokenIds;

    constructor() ERC721("MyNFT", "MNFT") {}

    function mint(
        address recipient,
        string memory tokenURI
    ) public returns (uint256) {
        _tokenIds++;
        uint256 newTokenId = _tokenIds;
        _mint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        return newTokenId;
    }
}
