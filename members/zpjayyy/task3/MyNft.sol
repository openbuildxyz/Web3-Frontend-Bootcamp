// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNft is ERC721 {
    uint256 private MAX_SUPPLY = 1001;
    uint256 private _nextTokenId = 0;

    constructor() ERC721("JayApe", "JayApe") {}

    function mint(address to) external {
        require(_nextTokenId < MAX_SUPPLY, "over max supply");
        uint256 tokenId = _nextTokenId++;
        _mint(to, tokenId);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/";
    }
}
