// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BPYCNFT is ERC721URIStorage {
    uint256 public currentTokenId;
    uint256 public tokenCounter;

    constructor() ERC721("Bored Pets Yacht Club", "BPYC") external onlyOwner {
        tokenCounter = 0;
    }

    function mintTo(address recipient) public payable returns (uint256) {
        uint256 newItemId = tokenCounter;
        _safeMint(recipient, newItemId);
        tokenCounter += 1;
        return newItemId;
    }
}