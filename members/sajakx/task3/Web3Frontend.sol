// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract Web3Fronted is ERC721{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor () ERC721('Web3FrontesToken','NFT'){
        _tokenIdCounter.increment();
    }

    function mint(address to) public{
        uint tokenId=_tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to,tokenId);
    }
}