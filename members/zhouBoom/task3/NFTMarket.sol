// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// 定义 NFTMarket 合约，继承 Ownable 标准
contract NFTMarket is Ownable {
    // 定义市场物品结构体
    struct MarketItem {
        address nftContract;
        uint256 tokenId;
        address seller;
        uint256 price;
    }

    // 存储市场物品的映射
    mapping(uint256 => MarketItem) private marketItems;
    // 计数市场物品的数量
    uint256 public itemCount;

    // 支付代币合约实例
    IERC20 public paymentToken;

    // 定义上架和购买事件
    event NFTListed(address indexed seller, address indexed nftContract, uint256 indexed tokenId, uint256 price);
    event NFTPurchased(address indexed buyer, address indexed nftContract, uint256 indexed tokenId, uint256 price);

    // 构造函数，初始化支付代币合约地址
    constructor(address _paymentToken) Ownable(msg.sender) {
        paymentToken = IERC20(_paymentToken);
    }

    // 上架 NFT 的函数
    function listItem(address nftContract, uint256 tokenId, uint256 price) public {
        // 增加上架前price检查，价格必须大于0
        require(price > 0, "Price must be greater than 0");
        // 转移 NFT 所有权给市场合约
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        // 创建市场物品并存储到映射中
        marketItems[itemCount] = MarketItem({
            nftContract: nftContract,
            tokenId: tokenId,
            seller: msg.sender,
            price: price
        });

        // 触发上架事件
        emit NFTListed(msg.sender, nftContract, tokenId, price);
        itemCount++;
    }

    // 购买 NFT 的函数
    function purchaseItem(uint256 itemId) public {
        MarketItem storage item = marketItems[itemId];
        require(item.price > 0, "Item not listed");

        // 转移支付代币
        paymentToken.transferFrom(msg.sender, item.seller, item.price);
        // 转移 NFT 所有权
        IERC721(item.nftContract).transferFrom(address(this), msg.sender, item.tokenId);

        // 触发购买事件
        emit NFTPurchased(msg.sender, item.nftContract, item.tokenId, item.price);
        // 删除已购买的市场物品
        delete marketItems[itemId];
    }

    // 获取市场上所有物品的函数
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            items[i] = marketItems[i];
        }
        return items;
    }
}
