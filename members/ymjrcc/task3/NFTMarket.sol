// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/interfaces/IERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";

contract NFTMarket {
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

    // NFTAddress => tokenId => Order
    mapping(address => mapping(uint256 => Order)) public nftList;
    IERC20 YMT;

    constructor(address _erc20) {
        YMT = IERC20(_erc20);
    }

    receive() external payable {}
    fallback() external payable {}

    function list(address _nftAddr, uint256 _tokenId, uint256 _price) public {
        IERC721 _nft = IERC721(_nftAddr);
        require(_nft.getApproved(_tokenId) == address(this), unicode"没有授权");
        require(_price > 0, unicode"价格要大于 0");
        Order storage _order = nftList[_nftAddr][_tokenId];
        _order.owner = msg.sender;
        _order.price = _price;
        _nft.transferFrom(msg.sender, address(this), _tokenId);
        emit List(msg.sender, _nftAddr, _tokenId, _price);
    }

    function purchase(address _nftAddr, uint256 _tokenId) public {
        Order storage _order = nftList[_nftAddr][_tokenId];
        require(_order.price > 0, unicode"价格要大于 0");
        require(YMT.balanceOf(msg.sender) >= _order.price, unicode"钱不够");
        IERC721 _nft = IERC721(_nftAddr);
        require(_nft.ownerOf(_tokenId) == address(this), unicode"nft不在合约中");
        _nft.transferFrom(address(this), msg.sender, _tokenId);
        YMT.transferFrom(msg.sender, _order.owner, _order.price);
        emit Purchase(msg.sender, _nftAddr, _tokenId, _order.price);
        delete nftList[_nftAddr][_tokenId];
    }
}