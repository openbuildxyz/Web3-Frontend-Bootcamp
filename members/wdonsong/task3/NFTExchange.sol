// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract NFTExchange is ReentrancyGuard{

    struct Listing{
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool isActive; //是否是挂单的NFT
    }



    //拍卖清单
    //类似于其他编程语言中的哈希表或字典。映射是一种无序的、不可迭代的数据结构
    //最外层的映射使用address作为键，这个地址对应的是NFT合约的地址。
    //内层的映射使用uint256作为键，这个键是NFT的唯一标识符（tokenId）。
    mapping (address=>mapping (uint256=>Listing)) public _Listings;

    //声明了一个名为 _paymentToken 的公开变量，它是一个 IERC20 类型的接口实例
    IERC20 public _paymentToken;
    
    // 所有NFT
    Listing[] private _AllListings;

    //上架事件
    //购买NFT事件
    //indexed在与前端交互时有用

//事件（Events）是 Solidity 中的一种机制，用于在区块链上记录特定操作的日志。
//事件可以在智能合约执行过程中触发，将事件信息存储在区块链的日志中。
//外部应用（如前端应用程序）和其他合约可以订阅和监听这些事件
//事件日志存储在区块链的日志中，而不是合约的存储中。日志存储成本较低，因此使用事件可以节省存储空间和降低成本。

//indexed 关键字用于标记事件参数，使其可被索引。最多可以有三个参数标记为 indexed。索引参数可以在事件日志中进行过滤和搜索，提高查询效率。
    event NFTListed(
        address indexed seller,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price
    );

    event NFTPurchased(
        address indexed seller,
        address indexed buyer,
        uint256 indexed tokenId,
        uint256 price
    );

//指定结算使用的token类型，部署的时候写死
//在合约部署时，构造函数自动执行。
//构造函数接受一个参数 paymentToken，这是一个以太坊地址，表示用于支付的 ERC20 代币的合约地址。
//IERC20(paymentToken)：将传入的 paymentToken 地址转换为 IERC20 接口类型,并将其存储在 _paymentToken 变量中。
    constructor(address paymentToken){
        _paymentToken=IERC20(paymentToken);
    }

    //上架授予的NFT，上架的时候指定NFT合约地址、token和price
    function ListingNFT(address nftContract, uint256 tokenId, uint256 price)external {
        //将传入的 nftContract 地址转换为 IERC721 接口实例。这样，合约可以调用 ERC721 标准定义的方法与该 NFT 合约进行交互。
        IERC721 nft=IERC721(nftContract);
        require(nft.ownerOf(tokenId)==msg.sender,"ur not the owner of this NFT!");
        //检查调用者（msg.sender）是否已授权合约地址（address(this)）可以管理其所有的 NFT。
        //this 代表合约自身，并可以在合约内部用来访问合约的地址和调用合约的方法。
        require(nft.isApprovedForAll(msg.sender, address(this)),"contract not approved!");

        //确保了市场的透明度和交易的顺利进行，同时便于合约记录和跟踪所有上架的 NFT。
        _Listings[nftContract][tokenId]=Listing(
            msg.sender,
            nftContract,
            tokenId,
            price,
            true
        );
        _AllListings.push(Listing(
            msg.sender,
            nftContract,
            tokenId,
            price,
            true
        ));
        emit NFTListed(msg.sender, nftContract, tokenId, price);
    }

    //出售NFT
    //external 关键字用于指定函数只能从合约外部调用，不能从合约内部调用。这种修饰符通常用于定义用户交互的接口，具有更低的 gas 消耗。
    //由 ReentrancyGuard 合约提供的修饰符，用于防止重入攻击。
    //ReentrancyGuard 合约使用一个状态变量来跟踪是否有函数正在执行。如果有函数在执行中，则阻止再次进入该函数。这种机制可以防止重入攻击。
    function buyNFT(address nftContract,uint256 tokenId)external nonReentrant{
        //合约从 _Listings 映射中获取了指定 NFT 的销售信息，并将其存储在 listing 变量中。
        //storage：这是一个数据位置修饰符，表示 listing 变量指向的是合约存储中的数据，而不是内存中的临时数据。
        Listing storage listing=_Listings[nftContract][tokenId];
        //	require：这是一个 Solidity 内置函数，用于执行条件检查。如果条件不满足，则抛出异常并回滚交易。
        require(listing.isActive,"this NFT is not for sale!");

        IERC721 nft=IERC721(nftContract);
        //transferFrom(address sender, address recipient, uint256 amount) 是 ERC20 标准中的一个方法，用于从 sender 地址转移 amount 数量的代币到 recipient 地址。
        require(_paymentToken.transferFrom(msg.sender, listing.seller, listing.price),"pay failed!");

        nft.safeTransferFrom(listing.seller, msg.sender, tokenId);
        listing.isActive=false;

        emit NFTPurchased(listing.seller, msg.sender, tokenId, listing.price);
    }

    //获取所有NFT 
    function getAllNFT() external view returns(Listing[] memory) {
        Listing[] memory allItem = new Listing[](_AllListings.length);
        Listing memory nftIdx;
        for (uint256 i = 0; i < _AllListings.length; i++) {
            nftIdx = _AllListings[i];
            allItem[i] = _Listings[nftIdx.nftContract][nftIdx.tokenId];
        }
        return allItem;
    }}