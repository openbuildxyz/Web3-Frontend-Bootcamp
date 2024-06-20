// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// transaction hash	0x52a1634ccb4609b4b161baeb11a429ecb4c6e934a2e996a7580b788a2ba90987
// contract hash 0xEb5755c8BB35E45A3aF8a91f3710D3d98F1a606d

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

// MyNFT.approve("0xYourNFTMarketAddress", 1);