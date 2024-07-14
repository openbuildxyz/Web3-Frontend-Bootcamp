// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IERC721Receiver} from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NftMarket is IERC721Receiver {
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
    }

    struct OrderData {
        address owner;
        uint256 price;
        uint256 listTime;
        uint256 tokenId;
    }

    mapping(address => mapping(uint256 => Order)) public orderList;
    mapping(address => uint256[]) public orderTokenIdList;

    IERC20 private _myToken;

    constructor(address _myTokenAddress) {
        _myToken = IERC20(_myTokenAddress);
    }

    function list(
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
        _nft.safeTransferFrom(msg.sender, address(this), _tokenId);

        uint256[] storage _tokenIdList = orderTokenIdList[_nftAddress];
        _tokenIdList.push(_tokenId);
        emit List(msg.sender, _nftAddress, _tokenId, _price);
    }

    function purchase(address _nftAddress, uint256 _tokenId) public {
        Order storage _order = orderList[_nftAddress][_tokenId];
        require(
            _myToken.balanceOf(msg.sender) > _order.price,
            "not enough token to buy"
        );

        IERC721 _nft = IERC721(_nftAddress);
        require(_nft.ownerOf(_tokenId) == address(this), "invalid order");

        _nft.safeTransferFrom(address(this), msg.sender, _tokenId);
        _myToken.transferFrom(msg.sender, _order.owner, _order.price);

        delete orderList[_nftAddress][_tokenId];
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

    function getAllListNft(
        address _nftAddress
    ) public view returns (OrderData[] memory orderDataList) {
        uint256[] storage _tokenIdList = orderTokenIdList[_nftAddress];
        OrderData[] memory _orderList = new OrderData[](_tokenIdList.length);
        for (uint256 i = 0; i < _tokenIdList.length; i++) {
            Order storage _order = orderList[_nftAddress][_tokenIdList[i]];
            _orderList[i] = OrderData(
                _order.owner,
                _order.price,
                _order.listTime,
                _tokenIdList[i]
            );
        }
        orderDataList = _orderList;
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
