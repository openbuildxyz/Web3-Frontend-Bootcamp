// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TestNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _nftIDCounter;

    constructor() ERC721("TestNFT", "MTK") {
        _nftIDCounter.increment();
    }

    function safeMint(address to) public {
        uint256 tokenId = _nftIDCounter.current();
        _nftIDCounter.increment();
        _safeMint(to, tokenId);
    }
}
