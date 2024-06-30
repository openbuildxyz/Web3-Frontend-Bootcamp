// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// contract hash 0x1a6370F290A81428249D5e914d363D56bB246ebe

contract NFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;
    // 记录已经铸造的tokenId
    uint256[] private _allTokens;

    event NFTCreated(uint256 indexed tokenId, string tokenURI);

    // onlyOwner 是一个修饰符，用于限制只有合约的所有者才能调用某些特定的函数
    constructor() ERC721("LemNFT", "LEMNFT") Ownable(msg.sender) {
        tokenCounter = 0;
    }

    function createNFT(string memory tokenURI) public onlyOwner returns (uint256) {
        uint256 newItemId = tokenCounter;
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _allTokens.push(newItemId);
        emit NFTCreated(newItemId, tokenURI);
        tokenCounter++;
        return newItemId;
    }

    // 获取所有已铸造的tokenId
    function getAllTokens() public view returns (uint256[] memory) {
        return _allTokens;
    }
}

// MyNFT.createNFT('www.xxxx.com')
// MyNFT.approve("0xYourNFTMarketAddress", 0);