// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract ShouHuNFT is ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    mapping(uint256 => string) private _tokenURIs; // 存储每个 token ID 对应的 URI
    mapping(address => uint256[]) private _ownedTokens; // 存储每个地址拥有的 token ID 列表

    constructor() ERC721("ShouHuToken", "SHT") {
        _tokenIdCounter.increment();
    }

    function mint(address to, string memory url) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenURIs[tokenId] = url;
        _ownedTokens[to].push(tokenId);
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    // 获取某个地址拥有的所有 token ID
    function tokensOfOwner(address owner) public view returns (uint256[] memory) {
        return _ownedTokens[owner];
    }

    // 获取所有 token 的 URI 列表
    function getAllTokenURIs() public view returns (string[] memory) {
        uint256 totalTokens = totalSupply();
        string[] memory tokenURIs = new string[](totalTokens);
        for (uint256 i = 0; i < totalTokens; i++) {
            // tokenid 从 1 开始
            tokenURIs[i] = _tokenURIs[i+1];
        }
        return tokenURIs;
    }

    // 从一个地址转移 token ID 给另一个地址
    function updateInfo(address from,address to,uint256 tokenId) public {
        // 更新 _ownedTokens
        uint256[] storage fromTokens = _ownedTokens[from];
        uint256[] storage toTokens = _ownedTokens[to];

        // 在 from 地址中找到并删除 tokenId
        for (uint256 i = 0; i < fromTokens.length; i++) {
            if (fromTokens[i] == tokenId) {
                // 将最后一个元素移到当前位置，然后删除最后一个元素
                fromTokens[i] = fromTokens[fromTokens.length - 1];
                fromTokens.pop();
                break;
            }
        }

        // 将 tokenId 添加到 to 地址中
        toTokens.push(tokenId);
    }
}
