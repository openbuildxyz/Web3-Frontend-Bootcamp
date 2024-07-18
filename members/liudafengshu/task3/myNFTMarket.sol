// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

contract NFTMarket is ReentrancyGuard {
    IERC20 public tokenContract;
    using Math for uint256;

    struct Listing {
        uint256 tokenId; 
        address seller; 
        address nftContract; 
        uint256 price; 
        bool active;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;


    address[] private nftContracts;
    // 记录每个合约地址对应的tokenId数组
    mapping(address => uint256[]) private nftTokenIds;

    // 上架NFT事件
    event NFTListed(
        uint256 indexed tokenId,
        address indexed seller,
        address indexed nftContract,
        uint256 price
    );

    // 下架NFT事件
    event NFTUnListed(uint256 indexed tokenId, address indexed seller);

    // 购买NFT事件
    event NFTSold(
        uint256 tokenId,
        address indexed buyer,
        address indexed seller,
        address nftContract,
        uint256 price
    );

    // 合约构造函数，初始化ERC20代币合约地址
    constructor(address _tokenContractAddress) {
        tokenContract = IERC20(_tokenContractAddress);
    }

    function getTokenContract() external view returns (IERC20) {
        return tokenContract;
    }

    // 上架NFT
    function listNFT(
        address _nftContract,
        uint256 _tokenId,
        uint256 _price
    ) external {
        // 确保上架者是NFT的所有者
        IERC721 nftContract = IERC721(_nftContract);
        require(nftContract.ownerOf(_tokenId) == msg.sender, "Not token owner");
        // 确保上架价格大于零
        require(_price > 0, "Price must be greater than zero");

        // 将NFT信息添加到上架列表中
        listings[_nftContract][_tokenId] = Listing(
            _tokenId,
            msg.sender,
            _nftContract,
            _price,
            true
        );

        // 如果该合约地址第一次上架NFT，则添加到nftContracts数组中
        if (nftTokenIds[_nftContract].length == 0) {
            nftContracts.push(_nftContract);
        }

        // 将tokenId添加到该合约地址对应的tokenId数组中
        nftTokenIds[_nftContract].push(_tokenId);

        // 触发上架NFT事件
        emit NFTListed(_tokenId, msg.sender, _nftContract, _price);
    }

    // 下架NFT
    function unListNFT(address _nftContract, uint256 _tokenId) external {
        // 获取上架信息
        Listing storage listing = listings[_nftContract][_tokenId];
        // 确保上架状态为激活
        require(listing.active, "Listing not active");
        // 确保下架人是拥有者
        require(listing.seller == msg.sender, "Not token owner");

        // 修改上架状态为非激活
        listing.active = false;

        emit NFTUnListed(_tokenId, msg.sender);
    }

    // 购买NFT
    function buyNFT(
        address _nftContract,
        uint256 _tokenId
    ) external nonReentrant {
        Listing storage listing = listings[_nftContract][_tokenId];
        require(listing.active, "Listing not active");

        IERC721 nft = IERC721(_nftContract);
        // 确保买家拥有足够的ERC20代币用于购买
        require(
            tokenContract.balanceOf(msg.sender) >= listing.price,
            "Insufficient balance"
        );
        // 从买家转移ERC20代币给卖家
        tokenContract.transferFrom(msg.sender, listing.seller, listing.price);
        // 从卖家转移NFT给买家
        nft.transferFrom(listing.seller, msg.sender, _tokenId);

        // 修改上架状态为非激活
        listing.active = false;

        emit NFTSold(
            _tokenId,
            msg.sender,
            listing.seller,
            _nftContract,
            listing.price
        );
    }

    // 获取所有上架的NFT信息
    function getAllListings() external view returns (Listing[] memory) {
        uint256 totalListings = 0;

        // 计算所有上架的NFT总数
        for (uint i = 0; i < nftContracts.length; i++) {
            address nftContract = nftContracts[i];
            totalListings += nftTokenIds[nftContract].length;
        }

        // 创建一个数组来存储所有的上架信息
        Listing[] memory allListings = new Listing[](totalListings);
        uint256 currentIndex = 0;

        // 填充数组
        for (uint i = 0; i < nftContracts.length; i++) {
            address nftContract = nftContracts[i];
            uint256[] storage tokenIds = nftTokenIds[nftContract];
            for (uint j = 0; j < tokenIds.length; j++) {
                uint256 tokenId = tokenIds[j];
                Listing storage listing = listings[nftContract][tokenId];
                if (listing.active) {
                    allListings[currentIndex] = listing;
                    currentIndex++;
                }
            }
        }

        return allListings;
    }
}