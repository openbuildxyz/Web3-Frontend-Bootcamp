// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NftToken is ERC721 {
    using  Counters for Counters.Counter;
    Counters.Counter private  _tokenIdCounter;

// 每 mint 一个 nft 都需要把 count+1 表示 nft 总数量
    constructor() ERC721("NftToken","NT") {
        _tokenIdCounter.increment();
    }

    function mint(address to) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
}