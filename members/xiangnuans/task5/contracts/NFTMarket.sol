// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

contract NFTMarket {
    struct Listing {
        address seller; // 卖家地址
        address nftContract; // NFT合约地址
        uint256 tokenId; // NFT 代币ID
        uint256 price; // 售价
        bool isActive; // 是否在售
        uint256 listingTime; // 上架时间
        uint256 delistingTime; // 下架时间
        string tokenURI;
    }

    mapping(address => mapping(uint256 => Listing)) public listings; // 存储上架的NFT信息
    IERC20 public paymentToken; // 支付代币合约实例
    address[] public nftContracts; // 存储所有有上架记录的NFT合约地址
    mapping(address => bool) private nftContractExists; // 记录合约地址是否已经存在

    event NFTListed(
        address indexed seller,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price,
        bool isActive,
        uint256 listingTime,
        string tokenURI
    );
    event NFTBought(
        address indexed buyer,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price,
        string tokenURI
    );
    event NFTDelisted(
        address indexed seller,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price,
        uint256 listingTime,
        uint256 delistingTime,
        string tokenURI,
        bool isActive
    );

    constructor(IERC20 _paymentToken) {
        paymentToken = IERC20(_paymentToken); // 初始化支付代币合约
    }

    /**
     * @dev 上架NFT
     * @param _nftContract NFT合约地址
     * @param _tokenId NFT代币ID
     * @param _price 售价
     */
    function listNFT(
        address _nftContract,
        uint256 _tokenId,
        uint256 _price
    ) external {
        IERC721 nft = IERC721(_nftContract);
        IERC721Metadata nftMetadata = IERC721Metadata(_nftContract);
        require(
            nft.ownerOf(_tokenId) == msg.sender,
            "Not the owner of the NFT"
        ); //  确保调用者是NFT的所有者

        require(nft.isApprovedForAll(msg.sender, address(this)), "No approval");

        string memory uri = nftMetadata.tokenURI(_tokenId);

        listings[_nftContract][_tokenId] = Listing(
            msg.sender,
            _nftContract,
            _tokenId,
            _price,
            true,
            block.timestamp, // 记录上架时间,
            0, // 初始化下架时间为0
            uri
        );
        emit NFTListed(
            msg.sender,
            _nftContract,
            _tokenId,
            _price,
            true,
            block.timestamp,
            uri
        ); // 触发上架时间
        if (!nftContractExists[_nftContract]) {
            nftContracts.push(_nftContract);
            nftContractExists[_nftContract] = true;
        }
    }

    /**
     * @dev 下架NFT
     * @param _nftContract NFT合约地址
     * @param _tokenId NFT代币ID
     */
    function delistNFT(address _nftContract, uint256 _tokenId) external {
        Listing storage listing = listings[_nftContract][_tokenId];
        require(listing.seller == msg.sender, "Not the seller"); // 确保调用者是卖家
        require(listing.isActive, "NFT not listed or already delisted"); // 确保NFT是上架状态

        listing.isActive = false;
        listing.delistingTime = block.timestamp; // 记录下架时间

        emit NFTDelisted(
            msg.sender,
            _nftContract,
            _tokenId,
            listing.price,
            listing.listingTime,
            listing.delistingTime,
            listing.tokenURI,
            listing.isActive
        ); //触发下架时间
    }

    /**
     * @dev 获取所有上架的NFT列表
     * @return 返回上架NFT的列表
     */
    function getAllListings() external view returns (Listing[] memory) {
        uint256 totalListings = 0;
        for (uint256 i = 0; i < nftContracts.length; i++) {
            address nftContract = nftContracts[i];
            for (uint256 j = 0; j < 100; j++) {
                // 这里假设一个合约中有10000个NFT
                if (listings[nftContract][j].isActive) {
                    totalListings++;
                }
            }
        } // 统计所有上架NFT的数量

        Listing[] memory activeListings = new Listing[](totalListings);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < nftContracts.length; i++) {
            address nftContract = nftContracts[i];
            for (uint256 j = 0; j < 100; j++) {
                if (listings[nftContract][j].isActive) {
                    activeListings[currentIndex] = listings[nftContract][j];
                    currentIndex++;
                }
            }
        }
        return activeListings;
    }

    /**
     * @dev 获取所有已下架的NFT列表
     * @return 返回已下架NFT的列表
     */
    function getAllDelisted() external view returns (Listing[] memory) {
        uint256 totalDelisted = 0;
        for (uint256 i = 0; i < nftContracts.length; i++) {
            address nftContract = nftContracts[i];

            for (uint256 j = 0; j < 100; j++) {
                if (
                    !listings[nftContract][j].isActive &&
                    listings[nftContract][j].delistingTime > 0
                ) {
                    totalDelisted++;
                }
            }
        }

        Listing[] memory delistedListings = new Listing[](totalDelisted);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < nftContracts.length; i++) {
            address nftContract = nftContracts[i];
            for (uint256 j = 0; j < 100; j++) {
                if (
                    !listings[nftContract][j].isActive &&
                    listings[nftContract][j].delistingTime > 0
                ) {
                    delistedListings[currentIndex] = listings[nftContract][j];
                    currentIndex++;
                }
            }
        }
        return delistedListings;
    }

    /**
     * @dev 获取所有已售NFT的列表
     * @return 返回已售NFT的列表
     */
    function getAllSold() external view returns (Listing[] memory) {
        uint256 totalSold = 0;

        // 统计所有已售NFT的数量
        for (uint256 i = 0; i < nftContracts.length; i++) {
            address nftContract = nftContracts[i];
            for (uint256 j = 0; j < 100; j++) {
                // 这里假设一个合约中最多有10000个NFT
                if (
                    !listings[nftContract][j].isActive &&
                    listings[nftContract][j].delistingTime == 0
                ) {
                    totalSold++;
                }
            }
        }

        Listing[] memory soldListings = new Listing[](totalSold);
        uint256 currentIndex = 0;

        // 获取所有已售的NFT
        for (uint256 i = 0; i < nftContracts.length; i++) {
            address nftContract = nftContracts[i];
            for (uint256 j = 0; j < 100; j++) {
                // 这里假设一个合约中最多有10000个NFT
                if (
                    !listings[nftContract][j].isActive &&
                    listings[nftContract][j].delistingTime == 0
                ) {
                    soldListings[currentIndex] = listings[nftContract][j];
                    currentIndex++;
                }
            }
        }

        return soldListings;
    }

    function buyNFT(address _nftContract, uint256 _tokenId) external {
        Listing storage listing = listings[_nftContract][_tokenId];
        require(listing.isActive, "NFT not for sale"); // 确保NFT在售

        IERC721 nft = IERC721(_nftContract);
        require(
            paymentToken.transferFrom(
                msg.sender,
                listing.seller,
                listing.price
            ),
            "Payment failed"
        ); // 确保支付成功

        nft.safeTransferFrom(listing.seller, msg.sender, _tokenId); // 转移NFT
        listing.isActive = false; // 标记为已售
        listing.delistingTime = 0; // 标记为0

        emit NFTBought(
            msg.sender,
            _nftContract,
            _tokenId,
            listing.price,
            listing.tokenURI
        );
    }
}
