// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IERC721Receiver} from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract BerNewNFTMarket is IERC721Receiver {
    event List(
        address indexed seller,
        address indexed nftAddr,
        uint256 indexed tokenId,
        uint256 price
    );

    event Purchase(
        address indexed buyer,
        address indexed nftAddr,
        uint256 indexed tokenId,
        uint256 price
    );

    event Cancel(
        address indexed seller,
        address indexed nftAddr,
        uint256 indexed tokenId
    );

    struct Order {
        address owner;
        uint256 price;
        uint256 listTime;
        address nftAddr;
        uint256 tokenId;

    }

    // struct OrderData {
    //     address owner;
    //     uint256 price;
    //     uint256 listTime;
    //     uint256 tokenId;
    // }
    // 记录所有订单

    Order[] public orders; // 存储所有订单
    // 记录 nftaddress 和 tokenid 对应的订单 在 orders 中的索引
    mapping(address=>mapping(uint256=>uint256)) public orderIndex;

    mapping(address => mapping(uint256 => Order)) public orderList;
    mapping(address => uint256[]) public orderTokenIdList;

    IERC20 public token;

    constructor(address _myTokenAddress) {
        token = IERC20(_myTokenAddress);
    }

    function listNFT(
        address _nftAddress,
        uint256 _tokenId,
        uint256 _price
    ) public {
        IERC721 _nft = IERC721(_nftAddress);
        require(
            _nft.getApproved(_tokenId) == address(this),
            "need approved this nft"
        );
        require(_price > 0, "price need more than zero");
        Order storage _order = orderList[_nftAddress][_tokenId];
        _order.owner = msg.sender;
        _order.price = _price;
        _order.listTime = block.timestamp;
        _order.nftAddr = _nftAddress;
        _order.tokenId = _tokenId;
        _nft.safeTransferFrom(msg.sender, address(this), _tokenId);

        orders.push(_order);
        orderIndex[_nftAddress][_tokenId] = orders.length - 1;

        uint256[] storage _tokenIdList = orderTokenIdList[_nftAddress];
        _tokenIdList.push(_tokenId);
        emit List(msg.sender, _nftAddress, _tokenId, _price);
    }

    function purchaseNFT(address _nftAddress, uint256 _tokenId) public {
        Order storage _order = orderList[_nftAddress][_tokenId];

        IERC721 _nft = IERC721(_nftAddress);
        require(_nft.ownerOf(_tokenId) == address(this), "invalid order");
        require(token.transferFrom(msg.sender, _order.owner, _order.price), "transfer failed");

        _nft.safeTransferFrom(address(this), msg.sender, _tokenId);

        delete orderList[_nftAddress][_tokenId];
        // 删除 orders 中的订单
        uint256 index = orderIndex[_nftAddress][_tokenId];
        orders[index] = orders[orders.length - 1];
        orderIndex[orders[orders.length - 1].nftAddr][orders[orders.length - 1].tokenId] = index;
        orders.pop();

        uint256[] storage _tokenIdList = orderTokenIdList[_nftAddress];
        for (uint256 i = 0; i < _tokenIdList.length; i++) {
            if (_tokenIdList[i] == _tokenId) {
                _tokenIdList[i] = _tokenIdList[_tokenIdList.length - 1];
                _tokenIdList.pop();
                break;
            }
        }

        emit Purchase(msg.sender, _nftAddress, _tokenId, _order.price);
    }

    function cancel(address _nftAddress, uint256 _tokenId) public {
        Order storage _order = orderList[_nftAddress][_tokenId];
        require(_order.owner == msg.sender, "not owner");

        IERC721 _nft = IERC721(_nftAddress);
        _nft.safeTransferFrom(address(this), msg.sender, _tokenId);

        delete orderList[_nftAddress][_tokenId];
        // 删除 orders 中的订单
        uint256 index = orderIndex[_nftAddress][_tokenId];
        orders[index] = orders[orders.length - 1];
        orderIndex[orders[orders.length - 1].nftAddr][orders[orders.length - 1].tokenId] = index;
        orders.pop();

        uint256[] storage _tokenIdList = orderTokenIdList[_nftAddress];
        for (uint256 i = 0; i < _tokenIdList.length; i++) {
            if (_tokenIdList[i] == _tokenId) {
                _tokenIdList[i] = _tokenIdList[_tokenIdList.length - 1];
                _tokenIdList.pop();
                break;
            }
        }

        emit Cancel(msg.sender, _nftAddress, _tokenId);
    }

    function getAllListNft() public view returns (Order[] memory) {
        return orders;

    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}