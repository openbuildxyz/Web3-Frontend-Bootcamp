
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract LighthouseNft is ERC721, Ownable {
    using Strings for uint256;


    // 元数据URI的基本URL
    string private _baseTokenURI;

    // 用于跟踪tokenId是否已经被使用
    mapping(uint256 => bool) private _tokenIdExists;

    // 构造函数，接收NFT的名称、符号和元数据URI作为参数
    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) Ownable(msg.sender) {
        // transferOwnership(msg.sender); // 先转移所有权  在调用 Ownable(msg.sender) 时，已经完成了对合约所有者的转移
        // _baseTokenURI = ""; // 初始化_baseTokenURI为空字符串或其他默认值
    }

    // 设置元数据URI的函数，只能由合约所有者调用
    function setBaseTokenURI(string memory baseTokenURI) external onlyOwner {
        _baseTokenURI = baseTokenURI;
    }

    // 获取元数据URI的函数
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    // 事件，当NFT被铸造时触发
    event LighthouseNFTMinted(address indexed owner, uint256 tokenId);

    // 铸造灯塔相关NFT的函数，只能由合约所有者调用
    function mintLighthouseNFT(address to, uint256 tokenId) external onlyOwner {
        // 确保tokenId未被使用
        require(!_tokenIdExists[tokenId], "Token already minted");

        // 将tokenId标记为已使用
        _tokenIdExists[tokenId] = true;

        // 调用OpenZeppelin的铸造函数来铸造新的NFT
        _safeMint(to, tokenId);

        // 触发铸造事件
        emit LighthouseNFTMinted(to, tokenId);
    }
}