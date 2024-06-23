// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNFTToken is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    //0x4Ad4c29355A810E0A458641a38936bFa33714e81  NFT 合约地址
    // 0x83Ac5678414dB95910e41B8ae1D281D25EE5b22a 市场合约地址
    constructor() ERC721("JasonStuToken", "JSTK") {
        _tokenIdCounter.increment();
    }

    function mint(address to) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
}
