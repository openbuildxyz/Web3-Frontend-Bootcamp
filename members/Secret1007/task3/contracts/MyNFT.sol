// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721URIStorage {
    uint256 private _currentTokenId = 0; //tokenId will start from 1

    constructor() ERC721("SecretNFT", "SNFT") {}

    function mintNFT(
        address recipient,
        string memory tokenURI
    ) public returns (uint256) {
        _currentTokenId++;
        uint256 newItemId = _currentTokenId;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function getCurrentTokenId() public view returns (uint256) {
        return _currentTokenId;
    }
}
