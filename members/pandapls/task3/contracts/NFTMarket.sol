
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTMarket {

  struct NFTItem {
      address nftContract; // NFT 合约地址
      uint256 tokenId; // NFT 的token Id
      address seller; // 卖家地址
      uint256 price; // NFT 的价格
  }

  // 卖家地址 => 卖家卖出的NFT => NFT信息
  mapping(address => mapping(uint256 => NFTItem)) private nftMap;

  // 支付的代币 - 只能用erc20协议的代币
  IERC20 private _paymentToken;


  // 存储所有上架的 NFT 的 tokenId，用于遍历 (nftContract => tokenIds)
  mapping(address => uint256[]) private nftTokens;


  event NFTListed(
    address indexed seller, 
    address indexed nftContract,
    uint256 indexed tokenId,
    uint256 price
  );

  event NFTPurchased(
    address indexed seller,
    address indexed nftContract,
    uint256 indexed tokenId,
    uint256 price
  );

  // 初始化 ERC20 支付代币合约
  constructor(address paymentToken) {
    _paymentToken = IERC20(paymentToken);
  }
  function token() external view returns (address) {
      return address(_paymentToken);
  }
  // 上架NFT
  function listNFT(address nftContract, uint256 tokenId, uint256 price) external {
    IERC721 nft = IERC721(nftContract);
    // 确保 NFT 合约地址不是 0
    require(nft.ownerOf(tokenId) == msg.sender, "not the owner of the contract");
    // 确保价格大于 0
    require(price > 0, "Price must be greater than zero");

    // 确保市场合约有权转移该 NFT
    require(nft.isApprovedForAll(msg.sender, address(this)), "the contract not be approved");


    nftMap[nftContract][tokenId] = NFTItem(nftContract, tokenId, msg.sender, price);
    // 将 tokenId 添加到 nftTokens 数组中，方便后续遍历
    nftTokens[nftContract].push(tokenId);

    emit NFTListed(msg.sender, nftContract, tokenId, price);
  }

  // 购买NFT
  function purchaseNFT(address nftContract, uint256 tokenId) external {
    NFTItem memory listedItem = nftMap[nftContract][tokenId];
    require(listedItem.price > 0, 'this nft is not for sale');

    bool success = _paymentToken.transferFrom(msg.sender, listedItem.seller, listedItem.price);
    // 将ERC20代币从买家转移到卖家
    require(success, "Paent failed!");

    // 将 NFT 从卖家转移给买家
    IERC721(nftContract).safeTransferFrom(listedItem.seller, msg.sender, tokenId);
    // 删除已售出的 NFT 上架信息
    delete nftMap[nftContract][tokenId];

    // 删除 nftTokens 中的该 tokenId
    uint256[] storage tokens = nftTokens[nftContract];
    for (uint256 i = 0; i < tokens.length; i++) {
      if (tokens[i] == tokenId) {
        tokens[i] = tokens[tokens.length - 1]; // 用最后一个 tokenId 替换要删除的
        tokens.pop(); // 删除最后一个元素
        break;
      }
    }

    emit NFTPurchased(msg.sender, nftContract, tokenId, listedItem.price);
  }

  // 获取指定合约的所有上架 NFT 信息
  function getAllNFTItems(address nftContract) external view returns (NFTItem[] memory) {
    uint256 totalItems = nftTokens[nftContract].length;
    NFTItem[] memory items = new NFTItem[](totalItems);

    // 遍历 nftTokens 数组并获取上架的 NFT 信息
    for (uint256 i = 0; i < totalItems; i++) {
        uint256 tokenId = nftTokens[nftContract][i];
        items[i] = nftMap[nftContract][tokenId];
    }

    return items;
  }

}
