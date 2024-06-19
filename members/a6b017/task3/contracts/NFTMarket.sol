// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
// openzeppelin是v5版本，ReentrancyGuard文件位置需要更新
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

//  solidity 中的自定义错误 可以选择传入或者不传入参数
error PriceMustBeAboveZero();
error NotApprovedForMarketplace();
error NotOwner();
error AlreadyListed(address nftAddress, uint256 tokenId);
error NotListed(address nftAddress, uint256 tokenId);
error PriceNotMet(address nftAddress, uint256 tokenId, uint256 price);

contract NFTMarket is ReentrancyGuard {
    // 卖家的地址和NFT价格
    struct Listing {
        uint256 price;
        address seller;
    }

    event ItemListed(
        address indexed seller,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price
    );

    // 买入事件
    event ItemBuy(
        address indexed buyer,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price
    );

    // 映射NFT的智能合约地址和tokenID
    mapping(address => mapping(uint256 => Listing)) private s_listings;
    // 卖家地址和卖出的总金额
    mapping(address => uint256) private s_proceeds;

    // 保证正在被上架的物品还没有上架
    modifier notListed(address nftAddress, uint256 tokenId) {
        Listing memory listing = s_listings[nftAddress][tokenId];
        if (listing.price > 0) {
            revert AlreadyListed(nftAddress, tokenId);
        }
        _;
    }

    // 保证正在上架这个物品的人（正在调用这个方法）是它的的所有人。
    modifier isOwner(
        address nftAddress,
        uint256 tokenId,
        address spender
    ) {
        IERC721 nft = IERC721(nftAddress);
        address owner = nft.ownerOf(tokenId);
        if (spender != owner) {
            revert NotOwner();
        }
        _;
    }

    // 检查卖家是否在列表中
    modifier isListed(address nftAddress, uint256 tokenId) {
        Listing memory listing = s_listings[nftAddress][tokenId];
        if (listing.price <= 0) {
            revert NotListed(nftAddress, tokenId);
        }
        _;
    }

    // 需要被外部调用
    function listItem(
        address nftAddress,
        uint256 tokenId,
        uint256 price
    )
        external
        notListed(nftAddress, tokenId)
        isOwner(nftAddress, tokenId, msg.sender)
    {
        // 检查NFT的价格是否高于 0 wei
        if (price <= 0) {
            revert PriceMustBeAboveZero();
        }

        // 保证这个通证的智能合约已经 “允许” 我们的 NFT 交易所来操作这个通证（比如说转账和其他操作）
        IERC721 nft = IERC721(nftAddress);
        if (nft.getApproved(tokenId) != address(this)) {
            revert NotApprovedForMarketplace();
        }

       
        s_listings[nftAddress][tokenId] = Listing(price, msg.sender);

        // 记录上架操作
        // 为智能合约添加通讯能力 触发事件关键词 emit
        // 卖家的地址，token ID，合约地址和上架的物品的价格
        emit ItemListed(msg.sender, nftAddress, tokenId, price);
    }

    // 列出已经上架的 NFT 信息
    function getListing(
        address nftAddress,
        uint256 tokenId
    ) external view returns (Listing memory) {
        return s_listings[nftAddress][tokenId];
    }

    // 允许买家使用ETH，从卖家列表中买入 NFT
    function buyItem(
        address acceptedTokenAddress,
        address nftAddress,
        uint256 tokenId
    ) external payable isListed(nftAddress, tokenId) nonReentrant {
        // 获取卖家列表，并判断支付的ETH是否小于卖家的价格
        Listing memory listedItem = s_listings[nftAddress][tokenId];
        if (msg.value < listedItem.price) {
            revert PriceNotMet(nftAddress, tokenId, listedItem.price);
        }

        // 更新卖家卖出的金额
        s_proceeds[listedItem.seller] += msg.value;
        // Could just send the money...
        // https://fravoll.github.io/solidity-patterns/pull_over_push.html

        // 从卖家列表中删除
        delete (s_listings[nftAddress][tokenId]);

        // 将 NFT（tokenId） 所有权从 listedItem.seller 转移到  msg.sender
        IERC721(nftAddress).safeTransferFrom(
            listedItem.seller,
            msg.sender,
            tokenId
        );
        //`transferFrom` 函数用于在两个地址之间转移代币，需要提前通过 `approve` 函数进行授权。
        IERC20(acceptedTokenAddress).transferFrom(
            msg.sender,
            listedItem.seller,
            listedItem.price
        );
        
        //注册买家事件
        emit ItemBuy(msg.sender, nftAddress, tokenId, listedItem.price);
    }
}
