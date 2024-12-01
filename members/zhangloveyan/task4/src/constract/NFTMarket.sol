// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTMarket is ReentrancyGuard {
    struct Listing {
        // nft 归属者
        address seller;
        // nft 合约地址
        address nftContract;
        // nft tokenid
        uint256 tokenId;
        // nft 价格
        uint256 price;
        // nft 是否上架
        bool isActive;
        // nft 上架时间
        uint256 listTime;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;
    // 用来保存已经上架的tokenId
    mapping(address => uint256[]) private tokenIdList;

    IERC20 public paymentToken;

    event NFTListed(
        address indexed seller,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price,
        bool isActive,
        uint256 listTime
    );

    event NFTUnListed(
        address indexed seller,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price,
        bool isActive,
        uint256 unListTime
    );

    event NFTPurchased(
        address indexed buyer,
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 price,
        bool isActive,
        uint256 buyTime
    );

    constructor(address _paymentToken) {
        paymentToken = IERC20(_paymentToken);
    }

    function listNFT(
        address _nftContract,
        uint256 _tokenId,
        uint256 _price
    ) external {
        IERC721 nft = IERC721(_nftContract);
        require(
            nft.ownerOf(_tokenId) == msg.sender,
            "Not the owner of the NFT"
        );
        require(_price > 0, "Price must be > 0.");
        require(
            nft.isApprovedForAll(msg.sender, address(this)),
            "Contract isn't approved."
        );

        listings[_nftContract][_tokenId] = Listing(
            msg.sender,
            _nftContract,
            _tokenId,
            _price,
            true,
            block.timestamp
        );

        tokenIdList[_nftContract].push(_tokenId);

        emit NFTListed(
            msg.sender,
            _nftContract,
            _tokenId,
            _price,
            true,
            block.timestamp
        );
    }

    function buyNFT(
        address _nftContract,
        uint256 _tokenId
    ) external nonReentrant {
        Listing storage listing = listings[_nftContract][_tokenId];
        require(listing.isActive, "NFT is not sale");
        IERC721 nft = IERC721(_nftContract);

        require(
            paymentToken.transferFrom(
                msg.sender,
                listing.seller,
                listing.price
            ),
            "Payment failed"
        );

        nft.safeTransferFrom(listing.seller, msg.sender, _tokenId);
        listing.isActive = false;
        listing.seller = msg.sender;
        remove(_nftContract, _tokenId);
        emit NFTPurchased(
            msg.sender,
            _nftContract,
            _tokenId,
            listing.price,
            false,
            block.timestamp
        );
    }

    function remove(address _nftContract, uint256 _tokenId) internal {
        uint256[] storage list = tokenIdList[_nftContract];
        for (uint256 i = 0; i < list.length; i++) {
            if (list[i] == _tokenId) {
                // 将最后一个元素移到当前位置，然后删除最后一个元素
                list[i] = list[list.length - 1];
                list.pop();
                break;
            }
        }
    }

    function getAllTokenIdList(
        address _nftContract
    ) public view returns (uint256[] memory) {
        return tokenIdList[_nftContract];
    }

    function getAllList(
        address _nftContract
    ) public view returns (Listing[] memory) {
        uint256[] memory tokenList = tokenIdList[_nftContract];
        uint256 len = tokenList.length;
        Listing[] memory list = new Listing[](len);
        for (uint256 i = 0; i < len; i++) {
            list[i] = listings[_nftContract][tokenList[i]];
        }
        return list;
    }

    function unListNFT(
        address _nftContract,
        uint256 _tokenId
    ) external nonReentrant {
        Listing storage listing = listings[_nftContract][_tokenId];
        require(listing.isActive, "NFT is not sale");
        IERC721 nft = IERC721(_nftContract);
        require(
            nft.ownerOf(_tokenId) == msg.sender,
            "You're not the owner of the NFT."
        );

        listing.isActive = false;
        listing.listTime = 0;

        remove(_nftContract, _tokenId);

        emit NFTUnListed(
            msg.sender,
            _nftContract,
            _tokenId,
            listing.price,
            false,
            block.timestamp
        );
    }
}
