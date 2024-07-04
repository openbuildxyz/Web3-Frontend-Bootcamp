// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MILKNT is ERC721 {
    uint256 private _nextId;

    constructor() ERC721("MILKNFT", "MILKNT") {}

    function saftMint(address to) public {
        uint256 tokenId = _nextId++;
        _safeMint(to, tokenId);
    }
}
