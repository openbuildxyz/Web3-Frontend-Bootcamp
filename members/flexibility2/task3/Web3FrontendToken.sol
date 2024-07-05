// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Web3FrontedToken is ERC721{
    // using Counters for Counters.Couter;
    // Counters.Counter private _tokenIdCounter;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Web3FrontendToken", "WFT"){
        _tokenIdCounter.increment();
    }

    function mint(address to ) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
}