// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";

contract LouNFT is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId = 0;
    string private _baseTokenURI;
    uint private _maxCirculation = 5; // 总量

    constructor(
        string memory baseURI
    ) ERC721("LouNFT", "LOU") Ownable(msg.sender) {
        _baseTokenURI = baseURI;
    }

    function mint(address to, string memory tokenURI) public onlyOwner {
        uint256 tokenId = _nextTokenId;
        require(tokenId >= 0 && tokenId < _maxCirculation,
            "tokenId out of range"
        );

        _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }

    function setMaxCirculation(uint circulation) public onlyOwner {
        _maxCirculation = circulation;
    }

    function getMaxCirculation() public view onlyOwner returns (uint256) {
        return _maxCirculation;
    }
}
