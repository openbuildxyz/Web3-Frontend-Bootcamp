// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Market is Ownable, ReentrancyGuard, IERC721Receiver {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

    address public acceptedTokenAddress;
    uint256 public listingPrice = 0.000000000000000001 ether;
    uint256 private _amountCollected;

    struct MarketItem {
        uint256 itemId;
        uint256 tokenId;
        address seller;
        address owner;
        uint256 price;
        bool isSold;
        bool isUpForSale;
        bool exists;
        uint256 createdTimestamp;
        uint256 listingTimestamp;
        address nftContract;
    }

    mapping(uint256 => MarketItem) public idToMarketItem;

    event MarketItemCreated(
        uint256 indexed itemId,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price
    );

    event MarketItemUpForSale(
        uint256 indexed itemId,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price
    );

    event MarketItemUpNotForSale(
        uint256 indexed itemId,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price
    );

    constructor(address _acceptedTokenAddress) {
        acceptedTokenAddress = _acceptedTokenAddress;
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external override returns (bytes4) {
        return this.onERC721Received.selector;
    }

    function addItemToMarket(
        uint256 tokenId,
        uint256 price,
        address nftContract
    ) public nonReentrant {
        require(
            price >= listingPrice,
            "Price should be at least same as listing price"
        );

        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        idToMarketItem[itemId] = MarketItem(
            itemId,
            tokenId,
            msg.sender,
            address(this),
            price,
            false,
            false,
            true,
            block.timestamp,
            block.timestamp,
            nftContract
        );

        IERC721(nftContract).safeTransferFrom(
            msg.sender,
            address(this),
            tokenId
        );

        _amountCollected += price;

        emit MarketItemCreated(itemId, tokenId, msg.sender, address(0), price);
    }

    // 如果售出后，新拥有者想要再上架, 重新做授权
    function relistAfterBuy(
        uint256 itemId,
        uint256 newPrice
    ) public nonReentrant {
        MarketItem memory item = idToMarketItem[itemId];

        idToMarketItem[itemId] = MarketItem(
            itemId,
            item.tokenId,
            msg.sender,
            address(this),
            newPrice,
            false,
            true,
            true,
            block.timestamp,
            block.timestamp,
            item.nftContract
        );

        IERC721(item.nftContract).safeTransferFrom(
            msg.sender,
            address(this),
            item.tokenId
        );

        emit MarketItemCreated(
            itemId,
            item.tokenId,
            msg.sender,
            address(0),
            newPrice
        );
    }

    // only valid when the nft owner is market,when the nft is sold, the owner is not the market
    // !isSold的情况下才能做上下架的操作
    function createSale(
        uint256 itemId,
        bool changePrice,
        uint256 newPrice
    ) public nonReentrant {
        MarketItem memory item = idToMarketItem[itemId];

        // require(item.owner == msg.sender, "Only Item owner can create sale.");
        require(item.exists == true, "Item does not exist.");

        idToMarketItem[itemId].isUpForSale = true;
        idToMarketItem[itemId].listingTimestamp = block.timestamp; // 设置上架时间
        if (changePrice) idToMarketItem[itemId].price = newPrice;

        emit MarketItemUpForSale(
            itemId,
            item.tokenId,
            msg.sender,
            address(this),
            idToMarketItem[itemId].price
        );
    }

    function unlistNFT(uint256 itemId) public nonReentrant {
        MarketItem memory item = idToMarketItem[itemId];

        // require(item.owner == msg.sender, "Only Item owner can create sale.");
        require(item.exists == true, "Item does not exist.");

        idToMarketItem[itemId].isUpForSale = false;

        emit MarketItemUpNotForSale(
            itemId,
            item.tokenId,
            msg.sender,
            address(this),
            idToMarketItem[itemId].price
        );
    }

    function buyItem(uint256 itemId) public nonReentrant {
        MarketItem storage item = idToMarketItem[itemId];
        uint256 price = item.price;
        uint256 tokenId = item.tokenId;
        bool isUpForSale = item.isUpForSale;
        require(isUpForSale == true, "NFT not for sale.");

        address seller = item.seller;

        item.owner = msg.sender;
        item.seller = msg.sender;
        item.isSold = true;
        item.isUpForSale = false;

        IERC721(item.nftContract).safeTransferFrom(
            address(this),
            msg.sender,
            tokenId
        );
        IERC20(acceptedTokenAddress).transferFrom(msg.sender, seller, price);

        _itemsSold.increment();
    }

    function getMarketItemById(
        uint256 marketItemId
    ) public view returns (MarketItem memory) {
        return idToMarketItem[marketItemId];
    }

    function getMarketItemByTokenIdAndAddress(
        uint256 tokenId,
        address nftContractAddress
    ) public view returns (MarketItem memory) {
        uint256 itemCount = _itemIds.current();
        for (uint256 i = 0; i < itemCount; i++) {
            uint256 currentId = i + 1;
            MarketItem memory item = idToMarketItem[currentId];
            if (
                item.tokenId == tokenId &&
                item.nftContract == nftContractAddress
            ) {
                return item;
            }
        }
        // 返回一个空的MarketItem结构
        return
            MarketItem({
                itemId: 0,
                tokenId: 0,
                seller: address(0),
                owner: address(0),
                price: 0,
                isSold: false,
                isUpForSale: false,
                exists: false,
                createdTimestamp: 0,
                listingTimestamp: 0,
                nftContract: address(0)
            });
    }

    function getUnsoldItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _itemIds.current();
        uint256 unsoldItemCount = _itemIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (!idToMarketItem[i + 1].isSold) {
                uint256 currentId = i + 1;
                MarketItem memory currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;
    }

    function getAllMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _itemIds.current();
        MarketItem[] memory items = new MarketItem[](itemCount);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < itemCount; i++) {
            uint256 currentId = i + 1;
            MarketItem memory currentItem = idToMarketItem[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }

        return items;
    }
}
