// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/interfaces/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/interfaces/IERC721.sol";

contract MyNFTMarket {
    IERC20 public erc20;
    IERC721 public erc721;

    bytes4 internal constant MAGIC_ON_ERC721_RECEIVED = 0x150b7a02;

    struct Order{ // 定义订单信息，包含价格、代币id、卖方 
        uint256 price;
        address seller;
        uint256 tokenId;
    }
    Order[] public orders; // 定义数组，存放所有的订单信息
    mapping(uint256 => Order) public idToOrder;// 根据tokenId查order
    mapping(uint256 => uint256) public idToOrderIndex; // 根据tokenId查在数组中的索引


    event Deal(address seller, address buyer, uint256 price, uint256 tokenId); // 买卖成功事件
    event OrderCancelled(address seller, uint256 tokenId);  // 卖家退出交易市场事件
    event PirceChange(address seller, uint256 tokenId, uint256 previousPrice, uint256 price); // 改价事件
    event NewOrder(address seller, uint256 price, uint256 tokenId); // 新的交易事件


    // 部署当前合约时，需要拿到ERC20和ERC721的地址，在构造函数中赋值
    constructor(address _erc20, address _erc721) {
        require(_erc20 != address(0), "zero address");
        require(_erc721 != address(0), "zero address");
        erc20 = IERC20(_erc20); // 将传入的地址转换为IERC20的实例
        erc721 = IERC721(_erc721); // 同上
    }

    // 买卖
    function buy(uint256 _tokenId) external{
        address buyer = msg.sender; // 当前合约调用者为买家
        uint price = idToOrder[_tokenId].price;
        address seller = idToOrder[_tokenId].seller;
        require(erc20.transferFrom(buyer, seller, price), "transfer failed"); // 买家转账给卖家
        erc721.safeTransferFrom(address(this), buyer, _tokenId); // 把NFT从当前合约中转给买家

        removeOrder(_tokenId);

        emit Deal(seller, buyer, price, _tokenId); // 释放交易信息
    }

    
    // 下架NFT，把NFT转给卖家
    function cancelOrder(uint256 _tokenId) external {
        address seller = idToOrder[_tokenId].seller;
        require(seller == msg.sender, "not seller");
        erc721.safeTransferFrom(address(this), seller, _tokenId);

        removeOrder(_tokenId);

        emit OrderCancelled(msg.sender, _tokenId);
    }

    // 删除变量中的值
    function removeOrder(uint256 _tokenId) internal {
        // 将数组中指定位置元素与最后一个元素交换位置，然后删除最后一个元素
        uint256 index = idToOrderIndex[_tokenId];
        uint256 lastIndex = orders.length - 1;
        if(index != lastIndex) {
           Order storage lastOrder = orders[lastIndex];
           orders[index] = lastOrder;
           idToOrderIndex[lastOrder.tokenId] = index;
        }
        orders.pop();

        delete idToOrder[_tokenId];
        delete idToOrderIndex[_tokenId];
    }


    // 改价NFT
    function changePrice(uint256 _tokenId, uint256 price) external{
        address seller = idToOrder[_tokenId].seller;
        require(seller == msg.sender, "not seller");
        uint256 previousPrice = idToOrder[_tokenId].price;
        idToOrder[_tokenId].price = price;
        Order storage order = orders[idToOrderIndex[_tokenId]];
        order.price = price;
        emit PirceChange(msg.sender, _tokenId, previousPrice ,price);
    }

  
    /** 
     * 上架NFT
     * operator 执行操作的地址  from 发送NFT的地址
     */
    function onERC721Received(address operator, address from, uint256 _tokenId, bytes calldata data) external returns (bytes4){
        uint256 price = toUint256(data, 0);
        require(price > 0, "price must be greater than 0");

        idToOrder[_tokenId] = Order(price, from, _tokenId);
        orders.push(Order(price, from, _tokenId));
        idToOrderIndex[_tokenId] = orders.length - 1;

        emit NewOrder(from, price, _tokenId);
        return MAGIC_ON_ERC721_RECEIVED; // 告诉发送方合约NFT转移成功
    }

    // 格式转换函数  view pure不消耗gas费，只能读取合约状态，不能修改
    // 从一个字节数组中的指定位置start开始，读取32字节数，并转换为uint256类型后返回
    function toUint256(bytes memory _bytes, uint256 _start) public pure returns (uint256) {
        require(_start + 32 >= _start, "Market: toUint256_overflow");
        require(_bytes.length >= _start + 32, "Market: toUint256_outOfBounds");
        uint256 tempUint;
        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
        return tempUint;
    }

    // 验证该tokenId的售卖地址不是零地址
    function isListed(uint256 _tokenId) public view returns (bool){
        return idToOrder[_tokenId].seller != address(0);
    }


    // 获取数组订单长度
    function getOrderLength() external view returns (uint256) {
        return orders.length;
    }


    // 获取所有上架的NFT
    function getAllNFTs() external view returns (Order[] memory) {
        return orders;
    }

    // 获取用户自己上架的NFT
    function getMyNFTs() external view returns (Order[] memory) {
        Order[] memory myOrders = new Order[](orders.length);
        uint256 count = 0;
        for(uint256 i = 0; i < orders.length; i++) {
            if(orders[i].seller == msg.sender) {
                myOrders[count] = orders[i];
                count++;
            }
        } 
        return myOrders;
    }


}
