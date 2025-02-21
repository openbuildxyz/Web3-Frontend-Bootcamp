// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFTMarket {
    struct Listing {
        address seller;
        uint256 price;
        address erc20Token;
    }

    // 添加新的状态变量来跟踪所有上架的NFT
    struct ListedItem {
        address nftContract;
        uint256 tokenId;
    }
    
    ListedItem[] public allListedItems;
    // 用于快速查找ListedItem在数组中的位置
    mapping(address => mapping(uint256 => uint256)) private listingIndex;

    // 映射：NFT合约地址 => TokenID => 上架信息
    mapping(address => mapping(uint256 => Listing)) public listings;

    // 事件声明
    event ItemListed(
        address indexed seller,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price,
        address erc20Token
    );

    event ItemPurchased(
        address indexed buyer,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price,
        address erc20Token
    );

    // 添加下架事件
    event ItemDelisted(
        address indexed seller,
        address indexed nftContract,
        uint256 indexed tokenId
    );

    // 上架NFT
    function listNFT(
        address nftContract,
        uint256 tokenId,
        uint256 price,
        address erc20Token
    ) external {
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        listings[nftContract][tokenId] = Listing({
            seller: msg.sender,
            price: price,
            erc20Token: erc20Token
        });
        
        // 添加到已上架NFT列表
        listingIndex[nftContract][tokenId] = allListedItems.length;
        allListedItems.push(ListedItem(nftContract, tokenId));
        
        emit ItemListed(msg.sender, nftContract, tokenId, price, erc20Token);
    }

    function _removeListing(address nftContract, uint256 tokenId) private {
        uint256 index = listingIndex[nftContract][tokenId];
        uint256 lastIndex = allListedItems.length - 1;
        
        if (index != lastIndex) {
            // 将最后一个元素移动到要删除的位置
            ListedItem memory lastItem = allListedItems[lastIndex];
            allListedItems[index] = lastItem;
            listingIndex[lastItem.nftContract][lastItem.tokenId] = index;
        }
        
        // 删除最后一个元素
        allListedItems.pop();
        delete listingIndex[nftContract][tokenId];
    }

    // 购买NFT
    function buyNFT(address nftContract, uint256 tokenId) external {
        Listing memory listing = listings[nftContract][tokenId];
        require(listing.price > 0, "Item not listed");

        // 转移ERC20代币
        IERC20(listing.erc20Token).transferFrom(
            msg.sender,
            listing.seller,
            listing.price
        );

        // 转移NFT
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);

        // 清除上架信息
        delete listings[nftContract][tokenId];

        _removeListing(nftContract, tokenId);

        emit ItemPurchased(
            msg.sender,
            nftContract,
            tokenId,
            listing.price,
            listing.erc20Token
        );
    }

    // 下架NFT
    function delistNFT(address nftContract, uint256 tokenId) external {
        Listing memory listing = listings[nftContract][tokenId];
        require(listing.seller == msg.sender, "Not the seller");

        // 将NFT归还给卖家
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);

        // 清除上架信息
        delete listings[nftContract][tokenId];

        _removeListing(nftContract, tokenId);

        emit ItemDelisted(msg.sender, nftContract, tokenId);
    }

    // 获取NFT上架信息
    function getListing(
        address nftContract,
        uint256 tokenId
    )
        external
        view
        returns (address seller, uint256 price, address erc20Token)
    {
        Listing memory listing = listings[nftContract][tokenId];
        return (listing.seller, listing.price, listing.erc20Token);
    }

    // 检查NFT是否已上架
    function isListed(
        address nftContract,
        uint256 tokenId
    ) external view returns (bool) {
        return listings[nftContract][tokenId].price > 0;
    }

    // 获取所有上架的NFT信息
    function getAllListedNFTs() external view returns (
        ListedItem[] memory items,
        address[] memory sellers,
        uint256[] memory prices,
        address[] memory erc20Tokens
    ) {
        uint256 length = allListedItems.length;
        items = allListedItems;
        sellers = new address[](length);
        prices = new uint256[](length);
        erc20Tokens = new address[](length);

        for (uint256 i = 0; i < length; i++) {
            Listing memory listing = listings[items[i].nftContract][items[i].tokenId];
            sellers[i] = listing.seller;
            prices[i] = listing.price;
            erc20Tokens[i] = listing.erc20Token;
        }

        return (items, sellers, prices, erc20Tokens);
    }

    // 获取上架NFT的总数
    function getListedNFTCount() external view returns (uint256) {
        return allListedItems.length;
    }
}
