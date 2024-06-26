// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarket is Ownable {
    struct MarketItem {
        address nftContract;
        uint256 tokenId;
        address seller;
        uint256 price;
    }

    mapping(uint256 => MarketItem) private marketItems;
    uint256 public itemCount;

    IERC20 public paymentToken;

    event NFTListed(address indexed seller, address indexed nftContract, uint256 indexed tokenId, uint256 price);
    event NFTPurchased(address indexed buyer, address indexed nftContract, uint256 indexed tokenId, uint256 price);

    constructor(address _paymentToken) Ownable(msg.sender) {
        paymentToken = IERC20(_paymentToken);
    }

    function listItem(address nftContract, uint256 tokenId, uint256 price) public {
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        marketItems[itemCount] = MarketItem({
            nftContract: nftContract,
            tokenId: tokenId,
            seller: msg.sender,
            price: price
        });

        emit NFTListed(msg.sender, nftContract, tokenId, price);
        itemCount++;
    }

    function purchaseItem(uint256 itemId) public {
        MarketItem storage item = marketItems[itemId];
        require(item.price > 0, "Item not listed");

        paymentToken.transferFrom(msg.sender, item.seller, item.price);
        IERC721(item.nftContract).transferFrom(address(this), msg.sender, item.tokenId);

        emit NFTPurchased(msg.sender, item.nftContract, item.tokenId, item.price);
        delete marketItems[itemId];
    }

    function fetchMarketItems() public view returns (MarketItem[] memory) {
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            items[i] = marketItems[i];
        }
        return items;
    }
}
