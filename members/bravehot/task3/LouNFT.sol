// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract LouNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _nextTokenId;
    string private _baseTokenURI;
    uint public MAX_APES = 5; // 总量

    constructor(
        string memory baseURI
    ) ERC721("LouNFT", "LOU") Ownable(msg.sender) {
        _baseTokenURI = baseURI;
    }

    function mint(address to, string memory tokenURI) public onlyOwner {
        uint256 tokenId = _nextTokenId.current();

        require(tokenId >= 0 && tokenId < MAX_APES, "tokenId out of range");
        _nextTokenId.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }
}
