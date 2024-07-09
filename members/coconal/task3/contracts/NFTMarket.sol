// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/interfaces/IERC721Receiver.sol";

contract NFTMarket {
    bytes4 internal constant MAGIC_ON_ERC721_RECEIVED = 0x150b7a02;

    IERC20 public token;

    struct NFTItem {
        address nftContract;
        uint256 tokenId;
        address owner;
        uint256 price;
        bool isSold;
    }

    mapping (uint256 => NFTItem) public items;

    uint256 public nextItemId;

    event NFTList(address nftContract,  uint256 indexed tokenId, uint256 price, uint256 indexed itemId);
    event NFTSold(address nftContract, uint256 indexed tokenId, uint256 price, address indexed buyer, address indexed seller);

    constructor(address _token) {
        token = IERC20(_token);
    }



    function ListNft (address _nftContract, uint256 _price, uint256 _tokenId) public {
        IERC721 nft = IERC721(_nftContract);
        require(nft.ownerOf(_tokenId) == msg.sender, "You are not the owner of this NFT");
        nft.safeTransferFrom(msg.sender, address(this), _tokenId, abi.encodePacked(_price));
        items[nextItemId] = NFTItem(_nftContract, _tokenId, msg.sender, _price, false);
        emit NFTList(_nftContract, _tokenId, _price, nextItemId);
    }

    function buyNft(uint256 _itemId) public {
        NFTItem storage item = items[_itemId];
        require(item.isSold == false, "Item is already sold");
        require(token.balanceOf(msg.sender) >= item.price, "Insufficient balance");
        require(item.owner != address(0), "Owner cannot be the zero address");
        token.transferFrom(msg.sender, item.owner, item.price);
        IERC721 nft = IERC721(item.nftContract);
        nft.safeTransferFrom(address(this), msg.sender, item.tokenId);
        item.isSold = true;
        emit NFTSold(item.nftContract, item.tokenId, item.price, msg.sender, item.owner);
    }
   
   function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4) {
        nextItemId++;
        return MAGIC_ON_ERC721_RECEIVED;
    }
}