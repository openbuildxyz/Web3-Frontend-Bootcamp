// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "./ERC20Token.sol";
import "./ERC721Token.sol";

contract NFTMarket {
    ERC20Token public tokenContract;
    ERC721Token public nftContract;

    struct Listing {
        address seller; // 上架者地址
        address nftContract; // NFT 合约地址
        uint256 tokenId; // NFT的Token ID
        uint256 price; // 上架价格（使用ERC20代币）
        bool active; // 上架状态
    }

    // 存储所有上架的NFT信息
    Listing[] public listings;

    // 上架NFT事件
    event NFTListed(
        uint256 indexed listingId,
        address indexed seller,
        address indexed nftContract,
        uint256 tokenId,
        uint256 price
    );
    // 购买NFT事件
    event NFTSold(
        uint256 indexed listingId,
        address indexed buyer,
        address indexed seller,
        address nftContract,
        uint256 tokenId,
        uint256 price
    );

    // 合约构造函数，初始化ERC20代币合约和ERC721 NFT合约地址
    constructor(address _tokenContractAddress, address _nftContractAddress) {
        tokenContract = ERC20Token(_tokenContractAddress);
        nftContract = ERC721Token(_nftContractAddress);
    }
    function getTokenContract() external view returns (ERC20Token) {
        return tokenContract;
    }

    function getNftContract() external view returns (ERC721Token) {
        return nftContract;
    }

    // 上架NFT
    function listNFT(
        address _nftContract,
        uint256 _tokenId,
        uint256 _price
    ) external {
        // 确保上架者是NFT的所有者
        require(nftContract.ownerOf(_tokenId) == msg.sender, "Not token owner");
        // 确保上架价格大于零
        require(_price > 0, "Price must be greater than zero");

        // 将NFT信息添加到上架列表中
        listings.push(
            Listing(msg.sender, _nftContract, _tokenId, _price, true)
        );

        // 触发上架NFT事件
        emit NFTListed(
            listings.length - 1,
            msg.sender,
            _nftContract,
            _tokenId,
            _price
        );
    }

    // 购买NFT
    function buyNFT(uint256 _listingId) external {
        // 获取上架信息
        Listing storage listing = listings[_listingId];
        // 确保上架状态为激活
        require(listing.active, "Listing not active");

        // 确保买家拥有足够的ERC20代币用于购买
        require(
            tokenContract.balanceOf(msg.sender) >= listing.price,
            "Insufficient balance"
        );

        // 从买家转移ERC20代币给卖家
        tokenContract.transferFrom(msg.sender, listing.seller, listing.price);
        // 从卖家转移NFT给买家
        nftContract.transferFrom(listing.seller, msg.sender, listing.tokenId);

        // 更新上架状态为非激活
        listing.active = false;
        // 触发购买NFT事件
        emit NFTSold(
            _listingId,
            msg.sender,
            listing.seller,
            listing.nftContract,
            listing.tokenId,
            listing.price
        );
    }
}

// 0x804D1F8eDcd0dC5F87D25F2B36D0655a7CABf50A
// localhost: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
