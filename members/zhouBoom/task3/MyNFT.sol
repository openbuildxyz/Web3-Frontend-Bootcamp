// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// 定义 MyNFT 合约，继承 ERC721URIStorage 和 Ownable 标准
contract MyNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    // 构造函数，设置 NFT 名称和符号，并初始化计数器
    constructor() ERC721("MyNFT", "MNFT") Ownable(msg.sender) {
        _tokenIdCounter = 0;
    }

    // 铸造新 NFT 的函数，只有合约所有者可以调用
    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        uint256 newTokenId = _tokenIdCounter;
        _mint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        _tokenIdCounter++;
        return newTokenId;
    }
}
