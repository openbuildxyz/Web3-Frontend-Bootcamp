// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// contract hash 0xCca02C77dE8EB2a0B3ffc486C94e3e41E20CcC97

contract NFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;
    // onlyOwner 是一个修饰符，用于限制只有合约的所有者才能调用某些特定的函数
    constructor() ERC721("LemNFT", "LEMNFT") Ownable(msg.sender) {
        tokenCounter = 0;
    }

    function createNFT(string memory tokenURI) public onlyOwner returns (uint256) {
        uint256 newItemId = tokenCounter;
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        tokenCounter++;
        return newItemId;
    }
}

// MyNFT.createNFT('www.xxxx.com')
// MyNFT.approve("0xYourNFTMarketAddress", 0);