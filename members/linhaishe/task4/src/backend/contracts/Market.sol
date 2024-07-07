// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/*
Marketplace contract 
*/

contract Market is Ownable, ReentrancyGuard, IERC721Receiver {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

    address public nftContract;
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

    constructor(address _nftContract, address _acceptedTokenAddress) {
        nftContract = _nftContract;
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
        uint256 price
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
            true
        );

        IERC20(acceptedTokenAddress).transferFrom(
            msg.sender,
            address(this),
            price
        );
        IERC721(nftContract).safeTransferFrom(
            msg.sender,
            address(this),
            tokenId
        );

        _amountCollected += price;

        emit MarketItemCreated(itemId, tokenId, msg.sender, address(0), price);
    }

    function createSale(
        uint256 itemId,
        bool changePrice,
        uint256 newPrice
    ) public nonReentrant {
        MarketItem memory item = idToMarketItem[itemId];

        // require(item.owner == msg.sender, "Only Item owner can create sale.");
        require(item.exists == true, "Item does not exist.");

        idToMarketItem[itemId].isUpForSale = true;
        if (changePrice) idToMarketItem[itemId].price = newPrice;

        emit MarketItemUpForSale(
            itemId,
            item.tokenId,
            msg.sender,
            item.seller,
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
            item.seller,
            idToMarketItem[itemId].price
        );
    }

    function buyItem(uint256 itemId, uint256 itemPrice) public nonReentrant {
        uint256 price = idToMarketItem[itemId].price;
        uint256 tokenId = idToMarketItem[itemId].tokenId;
        bool isUpForSale = idToMarketItem[itemId].isUpForSale;
        require(itemPrice >= price, "Asking Price not satisfied!");
        require(isUpForSale == true, "NFT not for sale.");

        address prevSeller = idToMarketItem[itemId].owner;
        idToMarketItem[itemId].price = itemPrice;
        idToMarketItem[itemId].owner = msg.sender;
        idToMarketItem[itemId].seller = msg.sender;
        idToMarketItem[itemId].isSold = true;
        idToMarketItem[itemId].isUpForSale = false;
        IERC721(nftContract).safeTransferFrom(prevSeller, msg.sender, tokenId);
        IERC20(acceptedTokenAddress).transferFrom(
            msg.sender,
            prevSeller,
            itemPrice
        );
        _itemsSold.increment();
    }

    function getMarketItemById(
        uint256 marketItemId
    ) public view returns (MarketItem memory) {
        MarketItem memory item = idToMarketItem[marketItemId];
        return item;
    }

    function getMarketItemByTokenId(
        uint256 tokenId
    ) public view returns (MarketItem memory) {
        MarketItem memory item;
        uint256 itemCount = _itemIds.current();
        bool found = false;

        for (uint256 i = 0; i < itemCount; i++) {
            uint256 currentId = i + 1;
            if (idToMarketItem[currentId].tokenId == tokenId) {
                item = idToMarketItem[currentId];
                found = true;
                break; // 找到匹配的项后，跳出循环
            }
        }

        // require(found, "Market item not found");
        return item;
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

    // 返回市场中所有的NFT信息
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
