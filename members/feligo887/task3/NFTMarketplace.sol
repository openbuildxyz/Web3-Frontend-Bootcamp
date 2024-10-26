// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol"; // 导入ERC721接口，用于NFT交互
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";   // 导入ERC20接口，用于自定义代币交互

// 创建一个简单的NFT市场合约
contract NFTMarketplace {
    
    // 定义一个结构体，用于保存每个上架的NFT信息
    struct Listing {
        address seller;        // 卖家地址
        address nftContract;   // NFT合约地址
        uint256 tokenId;       // NFT的Token ID
        uint256 price;         // NFT价格，使用自定义的ERC20代币
    }

    // 保存所有上架的NFT，每个上架项通过一个自增的ID来标识
    mapping(uint256 => Listing) public listings;
    uint256 public listingCounter; // 记录当前有多少个NFT上架，作为列表的ID

    // 自定义ERC20代币，用于购买NFT
    IERC20 public erc20Token;

    // 定义两个事件：一个用于NFT上架，另一个用于NFT被购买
    event NFTListed(address indexed seller, address indexed nftContract, uint256 indexed tokenId, uint256 price);
    event NFTBought(address indexed buyer, address indexed nftContract, uint256 indexed tokenId, uint256 price);

    // 构造函数：初始化时传入自定义的ERC20代币合约地址
    constructor(address _erc20Token) {
        erc20Token = IERC20(_erc20Token); // 初始化自定义ERC20代币
        listingCounter = 0;               // 初始化上架ID计数器，从0开始
    }

    // 上架NFT函数，允许用户将自己的NFT上架到市场
    // 参数：_nftContract 是NFT合约地址，_tokenId 是NFT的Token ID，_price 是上架的价格
    function listNFT(address _nftContract, uint256 _tokenId, uint256 _price) external {
        IERC721 nft = IERC721(_nftContract);  // 通过NFT合约地址构造ERC721接口实例
        
        // 检查调用者是否是该NFT的所有者
        require(nft.ownerOf(_tokenId) == msg.sender, "You are not the owner of this NFT");
        
        // 检查市场合约是否被授权操作该NFT
        require(nft.isApprovedForAll(msg.sender, address(this)) || nft.getApproved(_tokenId) == address(this), "Marketplace contract is not approved");

        // 将NFT上架信息保存到映射中
        listings[listingCounter] = Listing({
            seller: msg.sender,           // 卖家为当前调用者
            nftContract: _nftContract,    // NFT的合约地址
            tokenId: _tokenId,            // NFT的Token ID
            price: _price                 // 上架价格（使用ERC20代币）
        });

        // 触发NFT上架事件，方便外部系统监听
        emit NFTListed(msg.sender, _nftContract, _tokenId, _price);

        // 增加上架ID计数器，为下一个NFT上架分配唯一ID
        listingCounter++;
    }

    // 购买NFT函数，允许用户购买市场上架的NFT
    // 参数：_listingId 是上架的NFT ID
    function buyNFT(uint256 _listingId) external {
        // 获取上架的NFT信息
        Listing memory listing = listings[_listingId];
        
        // 确保NFT已经上架，价格必须大于0
        require(listing.price > 0, "This NFT is not listed");
        
        // 使用自定义的ERC20代币支付，检查是否代币转移成功
        require(erc20Token.transferFrom(msg.sender, listing.seller, listing.price), "ERC20 token transfer failed");

        // 调用NFT合约，安全地将NFT从卖家转移给买家
        IERC721(listing.nftContract).safeTransferFrom(listing.seller, msg.sender, listing.tokenId);

        // 触发NFT购买事件
        emit NFTBought(msg.sender, listing.nftContract, listing.tokenId, listing.price);

        // 删除该NFT的上架信息，防止重复购买
        delete listings[_listingId];
    }
}