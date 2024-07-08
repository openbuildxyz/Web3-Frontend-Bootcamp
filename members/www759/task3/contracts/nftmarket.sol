// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/interfaces/IERC721.sol";

contract Market {
    address public marketOwner;
    IERC20 public erc20;
    
    struct Order {
        address nftContractAddr;
        uint256 tokenId;
        address seller;
        uint256 price;
    }

    mapping(address => Order[]) public ordersOfNftContract;
    mapping(address => mapping(uint256 => Order)) public orderOfTokenId;
    mapping(address => mapping(uint256 => uint256)) public tokenIdToIndex;

    event NewOrder(
        address indexed nftContractAddr,
        address indexed seller, 
        uint256 indexed tokenId,
        uint256 price
    );

    event Deal(
        address indexed nftContractAddr,
        address indexed buyer,
        uint256 indexed tokenId,
        uint256 price
    );

    event OrderCanceled(
        address indexed nftContractAddr,
        address indexed seller, 
        uint256 indexed tokenId
    );

    event PriceChanged(
        address indexed nftContractAddr,
        address indexed seller, 
        uint256 indexed tokenId,
        uint256 oldPrice,
        uint256 newPrice
    );


    constructor(address _erc20Address) {
        require(_erc20Address != address(0), "erc20 address is zero");

        marketOwner = msg.sender;
        erc20 = IERC20(_erc20Address);
    }


    function listNFT(address _nftContractAddr, uint256 _tokenId, uint256 _price) public {
        require(_nftContractAddr != address(0), "contract address is zero");

        IERC721 nft = IERC721(_nftContractAddr);
        address seller = msg.sender;
        require(nft.ownerOf(_tokenId) == seller, "msg sender is not token's owner");
        require(nft.isApprovedForAll(seller, address(this)), "msg sender have not call setApprovedForAll for market");

        ordersOfNftContract[_nftContractAddr].push(Order(_nftContractAddr, _tokenId, seller, _price));
        tokenIdToIndex[_nftContractAddr][_tokenId] = ordersOfNftContract[_nftContractAddr].length - 1;
        orderOfTokenId[_nftContractAddr][_tokenId] = Order(_nftContractAddr, _tokenId, seller, _price);


        emit NewOrder(_nftContractAddr, seller, _tokenId, _price);
    }

    function buy(address _nftContractAddr, uint256 _tokenId) public {
        require(_nftContractAddr != address(0), "contract address is zero");

        IERC721 nft = IERC721(_nftContractAddr);
        Order memory order = orderOfTokenId[_nftContractAddr][_tokenId];
        require(order.seller != address(0), "token has not listed");
        require(order.seller != msg.sender, "buyer is seller");
        
        require(erc20.transferFrom(msg.sender, order.seller, order.price), "transfer erc20 fail");
        nft.safeTransferFrom(order.seller, msg.sender, _tokenId);

        _removeOrder(_nftContractAddr, _tokenId);

        emit Deal(_nftContractAddr, msg.sender, _tokenId, order.price);
    }


    function unlistNFT(address _nftContractAddr, uint256 _tokenId) public {
        require(_nftContractAddr != address(0), "contract address is zero");
        
        address seller = orderOfTokenId[_nftContractAddr][_tokenId].seller;
        require(seller != address(0), "token has not listed");
        require(msg.sender == seller, "msg sender is not seller");

        _removeOrder(_nftContractAddr, _tokenId);

        emit OrderCanceled(_nftContractAddr, seller, _tokenId);
    }


    function changePrice(address _nftContractAddr, uint256 _tokenId, uint256 _price) public {
        require(_nftContractAddr != address(0), "contract address is zero");
        address seller = orderOfTokenId[_nftContractAddr][_tokenId].seller;
        require(seller != address(0), "token has not listed");
        require(msg.sender == seller, "msg sender is not seller");

        uint256 oldPrice = orderOfTokenId[_nftContractAddr][_tokenId].price;
        orderOfTokenId[_nftContractAddr][_tokenId].price = _price;

        uint256 index = tokenIdToIndex[_nftContractAddr][_tokenId];
        ordersOfNftContract[_nftContractAddr][index].price = _price;
        
        emit PriceChanged(_nftContractAddr, seller, _tokenId, oldPrice, _price);
    }


    function isListed(address _nftContractAddr, uint256 _tokenId) external view returns (bool) {
        return orderOfTokenId[_nftContractAddr][_tokenId].seller != address(0);
    }
    

    function getAllOrders(address _nftContractAddr) external view returns (Order[] memory) {
        return ordersOfNftContract[_nftContractAddr];
    }


    function getOrderLength(address _nftContractAddr) external view returns(uint256) {
        return ordersOfNftContract[_nftContractAddr].length;
    }

    function _removeOrder(address _nftContractAddr, uint256 _tokenId) internal {
        uint256 index = tokenIdToIndex[_nftContractAddr][_tokenId];
        uint256 lastIndex = ordersOfNftContract[_nftContractAddr].length - 1;
        if(index != lastIndex) {
            Order storage lastOrder = ordersOfNftContract[_nftContractAddr][lastIndex];
            ordersOfNftContract[_nftContractAddr][index] = lastOrder;
            tokenIdToIndex[_nftContractAddr][lastOrder.tokenId] = index;
        }
        ordersOfNftContract[_nftContractAddr].pop();
        delete orderOfTokenId[_nftContractAddr][_tokenId];
        delete tokenIdToIndex[_nftContractAddr][_tokenId];
    }


}