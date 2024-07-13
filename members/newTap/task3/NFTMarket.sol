// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import { IERC20 } from "./Token.sol";
import {IERC721} from "./ERC721.sol";
// import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";


contract NFTMarket is ReentrancyGuard {

    event NftListed(
        address indexed nftContract,
        uint256 indexed nftTokenId,
        address indexed seller,
        address coinContract,
        uint256 price
    );

     event NftSold(
        address indexed buyer,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price
    );

    // 定义nft的基本信息
    struct NFTItem {
        uint256 price;
        uint256 nftTokenId;
        address nftContract;
        address seller;
        address coinContract;
        string tokenUrl;
        bool sale;
    }

    struct NFTIndex {
        uint256 nftTokenId;
        address nftContract;
    }

    mapping (address => mapping (uint256 => NFTItem)) public  listedNfts;

    
    NFTIndex[] public nftIndexPool;

// 上架nft到市场
// 需要指定价格,以及代币
    function Listing(uint256 price, uint256 nftTokenId, address nftContract, address coinContract) public {
        // 获取对应合约,确保合约在该账户中
        IERC721 nft = IERC721(nftContract);
        require(nft.ownerOf(nftTokenId) == msg.sender,"You're not the owner of the NFT.");
        require(price > 0,"Price must be greater thant 0");
        require(nft.isApprovedForAll(msg.sender, address(this)), "Contract isn't approved.");

        //当代币合约地址非空,则是修改信息
        if(address(0) != listedNfts[nftContract][nftTokenId].coinContract){
            // 修改nft上架信息
            listedNfts[nftContract][nftTokenId].price = price;
            listedNfts[nftContract][nftTokenId].coinContract = coinContract;
        }else{
            string memory tokenUrl = nft.getTokenUrl(nftTokenId);
            address seller = nft.ownerOf(nftTokenId);
            listedNfts[nftContract][nftTokenId] = NFTItem(price, nftTokenId, nftContract, seller, coinContract, tokenUrl, true);
            nftIndexPool.push(NFTIndex(nftTokenId, nftContract));
            // 上架nft事件
            emit NftListed(nftContract, nftTokenId, seller, coinContract, price);
        }
    }

    // 
    function updateNft(uint256 nftTokenId, address nftContract, uint256 price, bool sale) public {
        IERC721 nft = IERC721(nftContract);
        require(nft.ownerOf(nftTokenId) == msg.sender,"You're not the owner of the NFT.");
        require(price > 0,"Price must be greater thant 0");
        require(nft.isApprovedForAll(msg.sender, address(this)), "Contract isn't approved.");
        listedNfts[nftContract][nftTokenId].price = price;
        listedNfts[nftContract][nftTokenId].sale = sale;
    }

// 使用部署的nft来购买
    function buy(uint256 nftTokenId, address nftContract) payable public {
        NFTItem memory nftInfo = listedNfts[nftContract][nftTokenId];
        IERC20 coin = IERC20(nftInfo.coinContract);
        
        require(nftInfo.sale, "nft is not on sale");
        require(coin.balanceOf(msg.sender) > nftInfo.price, "Not enough funds");
// 购买nft操作
        require(coin.transferFrom(msg.sender, nftInfo.seller, nftInfo.price), "payment failure");
        
        IERC721 nft = IERC721(nftInfo.nftContract);

        nft.safeTransferFrom(nftInfo.seller, msg.sender, nftTokenId);

        listedNfts[nftContract][nftTokenId].seller = msg.sender;
        // 购买nft事件
        emit NftSold(msg.sender, nftContract, nftTokenId, nftInfo.price);
    }

    // 查询单个nft信息
    function getNft(uint256 nftTokenId, address nftContract) public view returns(NFTItem memory) {
        return listedNfts[nftContract][nftTokenId];
    }

    // 查询所有nft列表
    function getNfts() public view returns(NFTIndex[] memory){
        return nftIndexPool;
    }
}