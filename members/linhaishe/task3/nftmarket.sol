// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/interfaces/IERC721.sol";

contract Market {
  IERC20 public erc20;
  IERC721 public erc721;

  bytes4 internal constant MAGIC_ON_ERC721_RECEIVED = 0x150b7a02;
  struct Order {
    address seller;
    uint256 tokenId;
    uint256 price;
  }
  mapping(uint256 => Order) public orderOfId; //token id to order

  Order[] public orders;
  mapping(uint256 => uint256) public idToOrderIndex; //token id to index in orders

  event Deal(address seller, address buyer, uint256 tokenId, uint256 price);
  event NewOrder(address seller, uint256 tokenId, uint256 price);
  event PriceChanged(
    address seller,
    uint256 tokenId,
    uint256 privousPrice,
    uint256 price
  );
  event OrderCancelled(address seller, uint256 tokenId);

  constructor(address _erc20, address _erc721) {
    require(_erc20 != address(0), "zero address");
    require(_erc721 != address(0), "zero address");
    erc20 = IERC20(_erc20);
    erc721 = IERC721(_erc721);
  }

  function buy(uint256 _tokenId) external {
    address seller = orderOfId[_tokenId].seller;
    address buyer = msg.sender;
    uint256 price = orderOfId[_tokenId].price;
    //transferFrom代表market将钱由buyer转给seller，所以market需要被approve，market才能花a的钱，防止market私自花a的币
    require(
      erc20.transferFrom(buyer, seller, price),
      "transfer not successful"
    );
    erc721.safeTransferFrom(address(this), buyer, _tokenId); //这里不会调用hook函数
    //调用erc721.safeTransferFrom(address(this), seller, _tokenId)时，由于代币的接收方是seller地址，而不是当前合约地址address(this)，因此不会触发onERC721Received函数。
    //safeTransferFrom函数遵循ERC-721标准，并具有以下行为：

    //如果接收方是一个智能合约，并且实现了onERC721Received函数，那么将调用该函数。
    //如果接收方是一个智能合约，但未实现onERC721Received函数，或者返回值不正确，那么将抛出异常并回滚交易。
    //如果接收方是一个普通的外部地址（例如用户地址），那么不会调用onERC721Received函数。
    //所以，在您的情况下，由于seller是一个外部地址，而不是一个智能合约地址，所以onERC721Received函数不会执行。

    removeOrder(_tokenId);
    emit Deal(seller, buyer, _tokenId, price);
  }

  function cancelOrder(uint256 _tokenId) external {
    address seller = orderOfId[_tokenId].seller;
    require(msg.sender == seller, "not seller");
    erc721.safeTransferFrom(address(this), seller, _tokenId);
    removeOrder(_tokenId);
    emit OrderCancelled(seller, _tokenId);
  }

  function changePrice(uint256 _tokenId, uint256 _price) external {
    address seller = orderOfId[_tokenId].seller;
    require(msg.sender == seller, "not seller");

    uint256 previousPrice = orderOfId[_tokenId].price;
    orderOfId[_tokenId].price = _price;

    //因为我们还定义了一个查看所有订单的数据结构，所以这个数据结构里需要改价 storage存储在区块链上，memory存储在内存中，没有修改区块链上的
    Order storage order = orders[idToOrderIndex[_tokenId]];
    order.price = _price;

    emit PriceChanged(seller, _tokenId, previousPrice, _price);
  }

  //调用NFT合约的safeTransferFrom(四个参数)会自动调用这个方法
  //在NFT合约里调用safeTransferFrom，自动调用这个方法实现自动上架
  function onERC721Received(
    address operator,
    address from,
    uint256 tokenId,
    bytes calldata data
  ) external returns (bytes4) {
    uint256 price = toUint256(data, 0); //使用价格转换
    require(price > 0, "price must be greater than 0");

    //todo 上架

    orderOfId[tokenId] = Order(from, tokenId, price);
    orders.push(Order(from, tokenId, price));
    idToOrderIndex[tokenId] = orders.length - 1;

    emit NewOrder(from, tokenId, price);

    //return this.onERC721Received.selector;
    return MAGIC_ON_ERC721_RECEIVED;
  }

  //上面函数我们接收到一个bytes 类型的data 里面包含价格信息，需要使用下面的函数进行转换

  function toUint256(bytes memory _bytes, uint256 _start)
    public
    pure
    returns (uint256)
  {
    require(_start + 32 >= _start, "Market:toUint256_overflow");
    require(_bytes.length >= _start + 32, "Market: toUint256_outOfBounds");
    uint256 tempUint;

    assembly {
      tempUint := mload(add(add(_bytes, 0x20), _start))
    }
    return tempUint;
  }

  function removeOrder(uint256 _tokenId) internal {
    uint256 index = idToOrderIndex[_tokenId];
    uint256 lastIndex = orders.length - 1;
    if (index != lastIndex) {
      Order storage lastOrder = orders[lastIndex];
      orders[index] = lastOrder;
      idToOrderIndex[lastOrder.tokenId] = index;
    }
    orders.pop();
    delete idToOrderIndex[_tokenId];
    delete orderOfId[_tokenId];
  }

  //方便一个一个遍历
  function getOrderLength() external view returns (uint256) {
    return orders.length;
  }

  //可以整个输出
  function getAllNFTs() external view returns (Order[] memory) {
    return orders;
  }

  function getMyNFTs() external view returns (Order[] memory) {
    Order[] memory myOrders = new Order[](orders.length);
    uint256 count = 0;
    for (uint256 i = 0; i < orders.length; i++) {
      if (orders[i].seller == msg.sender) {
        myOrders[count] = orders[i];
        count++;
      }
    }
    return myOrders;
  }

  function isListed(uint256 _tokenId) public view returns (bool) {
    return orderOfId[_tokenId].seller != address(0);
  }
}
