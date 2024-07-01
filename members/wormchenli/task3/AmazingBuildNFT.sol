// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract AmazingBuildNFT is ERC721{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenCounter;
    uint256 maxNumber;

    constructor(uint256 _maxNumber) ERC721("AmazingBuildNFT", "AMBFT") {
        maxNumber = _maxNumber;
    }

    modifier canMint() {
        require(_tokenCounter.current() < maxNumber, "No more NFTs");
        _;
    }

    function mint(address to) public canMint {
        uint256 tokenId = _tokenCounter.current();
        _tokenCounter.increment();
        _safeMint(to, tokenId);
    }

    function totalMinted() public view returns (uint256) {
        return _tokenCounter.current();
    }
}
