// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract bigduck is ERC721, Ownable {
    uint public MAX_DUCKS=100;

    constructor(string memory name_,string memory symbol_,address owner_) ERC721(name_,symbol_) Ownable(owner_) {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmYvhVSRFAhxJWSNscF57RvMugqo7FGY53QAPmWQiMcgxU/";
    }

    function baseURI() external pure returns (string memory) {
        return _baseURI();
    }

    function mint(address to, uint tokenId) external onlyOwner {
        require(tokenId >= 0 && tokenId < MAX_DUCKS, "tokenId out of range");
        _mint(to, tokenId);
    }
}