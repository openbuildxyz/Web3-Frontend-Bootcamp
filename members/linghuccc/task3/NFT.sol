// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721, Ownable {
    uint256 private _currentTokenId;
    string private _uri;

    event NftMinted(address indexed recipient, uint256 indexed tokenId);

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _strURI
    ) ERC721(_name, _symbol) Ownable(_msgSender()) {
        _uri = _strURI;
    }

    function mintTo(address recipient) external onlyOwner returns (uint256) {
        // NFT tokenId will start from 1
        uint256 newItemId = ++_currentTokenId;
        _safeMint(recipient, newItemId);

        emit NftMinted(recipient, newItemId);

        return newItemId;
    }

    function _baseURI() internal view override returns (string memory) {
        return _uri;
    }
}
