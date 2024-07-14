// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DeJeuneNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _nftIDCounter;

    constructor() ERC721("DeJeuneNFT", "DeJeune") {
        _nftIDCounter.increment();
    }

    function safeMint(address to) public {
        uint256 tokenId = _nftIDCounter.current();
        _nftIDCounter.increment();
        _safeMint(to, tokenId);
    }
}
