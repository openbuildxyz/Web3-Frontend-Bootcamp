// SPDX-License-Identifier: MIT
// Layout of Contract:
// version
// imports
// interfaces, libraries, contracts
// Errors
// Type declarations
// State variables
// Events
// Modifiers
// Functions

// Layout of Functions:
// constructor
// receive function (if exists)
// fallback function (if exists)
// external
// public
// internal
// private
// view & pure functions
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract HaisenNftMarket {
    /////////////////
    /// Errors //////
    /////////////////
    error HaisenNftMarket__constructor__ZeroAddress();
    error HaisenNftMarket__buy__ZeroAddress();
    error HaisenNftMarket__cancelOrder__NotSeller();
    error HaisenNftMarket__changePrice__NotSeller();
    error HaisenNftMarket__onERC721Received__PriceMustBeGreaterThanZero();
    error HaisenNftMarket__ToUint256__OutOfBounds();
    error HaisenNftMarket__ToUint256__OverFlow();
    ///////////////////////////
    /// Type declarations /////
    ///////////////////////////

    struct Order {
        uint256 tokenId;
        uint256 price;
        address seller;
        string tokenUri;
    }
    /////////////////////////
    /// State variables /////
    /////////////////////////

    IERC20 public HST;
    IERC721 public NFT;
    bytes4 internal constant MAGIC_ON_ERC721_RECEIVED = 0x150b7a02;
    mapping(uint256 => Order) public s_ordersOfId;
    Order[] public s_orders;
    mapping(uint256 => uint256) public s_tokenIdToOrderIndex;
    /////////////////////////
    ///     Event         ///
    /////////////////////////

    event HaisenNftMarket_Deal(address indexed seller, address indexed buyer, uint256 indexed tokenId, uint256 price);
    event HaisenNftMarket_NewOrder(address indexed seller, uint256 indexed tokenId, uint256 price);
    event HaisenNftMarket_PriceChanged(
        address indexed seller, uint256 indexed tokenId, uint256 previousPrice, uint256 price
    );
    event HaisenNftMarket_OrderCancelled(address indexed seller, uint256 indexed tokenId);

    /////////////////////////
    ///     Functions     ///
    /////////////////////////
    constructor(address _HST, address _NFT) {
        if (_HST == address(0)) {
            revert HaisenNftMarket__constructor__ZeroAddress();
        }
        if (_NFT == address(0)) {
            revert HaisenNftMarket__constructor__ZeroAddress();
        }
        HST = IERC20(_HST);
        NFT = IERC721(_NFT);
    }

    ///////////////////////////
    ///  External Functions ///
    ///////////////////////////
    /**
     * @dev Buy the NFT with the given tokenId.
     * @param _tokenId The NFT identifier to buy
     */
    function buy(uint256 _tokenId) external {
        Order memory order = s_ordersOfId[_tokenId];
        address seller = order.seller;
        address buyer = msg.sender;
        uint256 price = order.price;

        if (!HST.transferFrom(buyer, seller, price)) {
            revert HaisenNftMarket__buy__ZeroAddress();
        }
        NFT.safeTransferFrom(address(this), buyer, _tokenId);
        removeOrder(_tokenId);
        emit HaisenNftMarket_Deal(seller, buyer, _tokenId, price);
    }

    function cancelOrder(uint256 _tokenId) external {
        address seller = s_ordersOfId[_tokenId].seller;
        if (!(msg.sender == seller)) {
            revert HaisenNftMarket__cancelOrder__NotSeller();
        }

        NFT.safeTransferFrom(address(this), seller, _tokenId);
        removeOrder(_tokenId);
        emit HaisenNftMarket_OrderCancelled(seller, _tokenId);
    }

    function changePrice(uint256 _tokenId, uint256 _price) external {
        address seller = s_ordersOfId[_tokenId].seller;
        if (!(msg.sender == seller)) {
            revert HaisenNftMarket__changePrice__NotSeller();
        }
        uint256 previousPrice = s_ordersOfId[_tokenId].price;
        s_ordersOfId[_tokenId].price = _price;

        Order storage order = s_orders[s_tokenIdToOrderIndex[_tokenId]];
        order.price = _price;

        emit HaisenNftMarket_PriceChanged(seller, _tokenId, previousPrice, _price);
    }

    /**
     * @dev This is the function that the NFT contract calls when safeTransferring an NFT to this contract.
     *      We will use this function to list the NFT for sale.
     * @param operator The address that called `safeTransferFrom` function
     * @param from The address that previously owned the token
     * @param tokenId The NFT identifier which is being transferred
     * @param data Additional data with no specified format
     */
    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data)
        external
        returns (bytes4)
    {
        (uint256 price, string memory tokenUri) = abi.decode(data, (uint256, string));
        //uint256 price = toUint256(data, 0);
        if (price <= 0) {
            revert HaisenNftMarket__onERC721Received__PriceMustBeGreaterThanZero();
        }
        s_orders.push(Order(tokenId, price, from, tokenUri));
        s_ordersOfId[tokenId] = Order(tokenId, price, from, tokenUri);
        s_tokenIdToOrderIndex[tokenId] = s_orders.length - 1;
        emit HaisenNftMarket_NewOrder(from, tokenId, price);
        return MAGIC_ON_ERC721_RECEIVED;
    }
    /////////////////////////
    ///  Public Functions ///
    /////////////////////////
    /**
     * @dev Returns true if the token is listed for sale.
     */

    function isListed(uint256 _tokenId) public view returns (bool) {
        return s_ordersOfId[_tokenId].seller != address(0);
    }

    function getOrderLength() external view returns (uint256) {
        return s_orders.length;
    }

    function getAllNFTs() external view returns (Order[] memory) {
        return s_orders;
    }

    function getMyNFTs() external view returns (Order[] memory) {
        Order[] memory myOrders = new Order[](s_orders.length);
        uint256 count = 0;
        for (uint256 i = 0; i < s_orders.length; i++) {
            if (s_orders[i].seller == msg.sender) {
                myOrders[count] = s_orders[i];
                count++;
            }
        }
        return myOrders;
    }

    function getOrder(uint256 _tokenId) public view returns (Order memory) {
        return s_ordersOfId[_tokenId];
    }

    function toUint256(bytes memory _bytes, uint256 _start) public pure returns (uint256) {
        if (_start + 32 > _bytes.length) {
            revert HaisenNftMarket__ToUint256__OutOfBounds();
        }
        if (_start + 32 < _start) {
            revert HaisenNftMarket__ToUint256__OverFlow();
        }
        uint256 tempUint;
        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
        return tempUint;
    }

    //////////////////////////
    ///  internal Functions //
    //////////////////////////
    function removeOrder(uint256 _tokenId) internal {
        uint256 index = s_tokenIdToOrderIndex[_tokenId];
        uint256 lastIndex = s_orders.length - 1;
        if (index != lastIndex) {
            Order memory lastOrder = s_orders[lastIndex];
            s_orders[index] = lastOrder;
            s_tokenIdToOrderIndex[lastOrder.tokenId] = index;
        }
        s_orders.pop();
        delete s_ordersOfId[_tokenId];
        delete s_tokenIdToOrderIndex[_tokenId];
    }
}
