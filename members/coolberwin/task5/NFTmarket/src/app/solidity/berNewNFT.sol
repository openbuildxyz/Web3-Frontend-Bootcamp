// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BerNewNFT is ERC721 {
    uint256 public MAX_SUPPLY = 1000;
    uint256 public _nextTokenId = 0;

    constructor() ERC721("BerNewNFT", "BN") {}

    function mint(address to) external returns (uint256){
        require(_nextTokenId < MAX_SUPPLY, "over max supply");
        uint256 tokenId = _nextTokenId++;
        _mint(to, tokenId);
        return tokenId;
    }
    function getTotalSupply() external view returns (uint256){
        return MAX_SUPPLY;
    }
    function getHasMinted() external view returns (uint256){
        return _nextTokenId;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/";
    }
}