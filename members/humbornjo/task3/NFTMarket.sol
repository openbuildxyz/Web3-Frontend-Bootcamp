// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFTExchange is Ownable(msg.sender){
    struct Item {
        address owner;
        address nft;
        uint256 tokenID;
        uint256 price;
        bool isSold;
    }

    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    IERC20 private _erc20Token;
    mapping (uint256 => Item) public gallery;

    event List(uint256 itemID, address indexed owner, address nftContract, uint256 tokenID, uint256 price);
    event Sold(uint256 itemID, address indexed owner, address nftContract, uint256 tokenID, uint256 price);

    constructor(IERC20 _tokenContract) {
        _erc20Token = _tokenContract;
    }

    // 上架时需要指定NFT的合约地址、Token ID以及价格（使用ERC20代币）。
    function listNFT(
        address nftContract, 
        uint256 tokenID, 
        uint256 price) external
    {
        require(price > 0, "Price must be greater than zero");
        require(
            IERC721(nftContract).getApproved(tokenID) == address(this) ||
                IERC721(nftContract).isApprovedForAll(msg.sender, address(this)),
            "Marketplace must be approved to transfer the item"
        );

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenID);

        _itemIds.increment();
        uint256 itemID = _itemIds.current();
        gallery[itemID] = Item (
            msg.sender, 
            nftContract, 
            tokenID,
            price, false
        );

        emit List(itemID, msg.sender, nftContract, tokenID, price);
    }

    function buyNFT(
        uint256 itemID
    ) external 
    {
        Item storage item = gallery[itemID];
        require(item.isSold == false, "nft already been sold");
        require(
            _erc20Token.allowance(msg.sender, address(this))>= item.price, 
            "insufficient allowance"
        );

        _erc20Token.transferFrom(msg.sender, item.owner, item.price);
        IERC721(item.nft).transferFrom(address(this), msg.sender, item.tokenID);    

        gallery[itemID].isSold = true;
        emit Sold(itemID, msg.sender, item.nft, item.tokenID, item.price);
    }

    function delistNFT(uint256 itemID) external onlyOwner{
        Item storage item = gallery[itemID];
        require(item.isSold == false,  "nft already been sold");
        IERC721(item.nft).transferFrom(address(this), item.owner, item.tokenID);
        delete gallery[itemID];
    }
}