// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarket is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;
    uint256 private _itemsSold;
    uint256 public listingPrice = 0.000000001 ether;
    address payable public marketOwner;

    constructor() ERC721("NFTMarket", "NFTM") Ownable( msg.sender) {
        marketOwner = payable(msg.sender);
    }

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;

    event MarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    event SaleCreated(
        uint256 indexed tokenId,
        address seller,
        uint256 price
    );

    event SaleCompleted(
        uint256 indexed tokenId,
        address buyer,
        uint256 price
    );

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function setListingPrice(uint256 _listingPrice) public onlyOwner {
        listingPrice = _listingPrice;
    }

    function createToken(string memory tokenURI, uint256 price) public payable returns (uint256) {
        require(msg.value == listingPrice, "Price must be equal to listing price");

        _tokenIds++;
        uint256 newItemId = _tokenIds;

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        createMarketItem(newItemId, price);
        return newItemId;
    }

    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "Price must be at least 1 wei");

        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(msg.sender),
            price,
            false
        );

        emit MarketItemCreated(tokenId, msg.sender, msg.sender, price, false);
    }

    function createMarketSale(uint256 tokenId) public payable {
        uint256 price = idToMarketItem[tokenId].price;
        address seller = idToMarketItem[tokenId].seller;
        require(msg.value == price, "Please submit the asking price in order to complete the purchase");

        idToMarketItem[tokenId].owner = payable(msg.sender);
        idToMarketItem[tokenId].sold = true;
        _itemsSold++;
        _transfer(seller, msg.sender, tokenId);
        payable(marketOwner).transfer(listingPrice);
        payable(seller).transfer(msg.value);

        emit SaleCompleted(tokenId, msg.sender, price);
    }

    function cancelListing(uint256 tokenId) public {
        MarketItem storage item = idToMarketItem[tokenId];
        require(item.seller == msg.sender, "Only the seller can cancel the listing");
        require(item.sold == false, "Cannot cancel a sold item");

        item.owner = payable(item.seller);
        item.sold = true;
        _itemsSold++;

        _transfer(address(this), item.seller, tokenId);
    }

    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds;
        uint256 unsoldItemCount = itemCount - _itemsSold;
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].sold == false) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}