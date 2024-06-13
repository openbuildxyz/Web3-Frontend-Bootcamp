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

    struct Order {
        address owner;
        uint256 price;
    }

    mapping(address => mapping(uint256 => Order)) public orderList;

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
        _nft.safeTransferFrom(msg.sender, address(this), _tokenId);

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

        emit Purchase(msg.sender, _nftAddress, _tokenId, _order.price);
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
