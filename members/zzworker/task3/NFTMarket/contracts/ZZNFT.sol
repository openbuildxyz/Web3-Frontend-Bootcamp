// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ZZNFT is ERC721URIStorage {
    uint256 private _tokenIds;

    event NFTMinted(address indexed owner, uint256 itemId, string itemURI);

    constructor() ERC721("ZZNFT", "ZZN") {}

    function mintNFT(address recipient, string memory tokenURI) public returns (uint256) {
        _tokenIds++;
        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        emit NFTMinted(recipient, newItemId, tokenURI);
        return newItemId;
    }
}