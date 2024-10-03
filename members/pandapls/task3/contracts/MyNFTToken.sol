// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFTToken is ERC721 {
    uint256 private _nextTokenId;

    // 修改构造函数，传递名称和符号给 ERC721
    constructor() ERC721("POPNFT", "PNFT") {
        _nextTokenId = 0;
    }

 function mint() external returns (uint256) {
        uint256 tokenId = _nextTokenId;

        _safeMint(msg.sender, tokenId);

        _nextTokenId++;

        return tokenId;
    }
}