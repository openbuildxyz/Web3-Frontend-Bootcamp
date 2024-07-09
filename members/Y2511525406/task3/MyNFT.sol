// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    uint256 private _totalCount;

    constructor() ERC721("YZQNFT", "YZQNFT") {
        _totalCount++;
    }

    function mint() external returns (uint256) {
        uint256 tokenId = _totalCount;

        _safeMint(msg.sender, tokenId);

        _totalCount++;

        return tokenId;
    }
}
