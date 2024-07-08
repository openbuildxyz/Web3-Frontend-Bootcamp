// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract VVNft is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint256 private _totalSupply;

    constructor(uint256 totalSupply) ERC721("VV NFT", "VVNFT") {
        _totalSupply = totalSupply;
    }

    function mintNFT(address to) public {
        uint256 tokenId = _tokenIds.current();
        require(tokenId < _totalSupply, "Mint NFT error, insuffecient NFT");
         _tokenIds.increment();
        _safeMint(to, tokenId);
    }
}
