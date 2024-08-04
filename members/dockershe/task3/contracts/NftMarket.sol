
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";


error PriceNotMet(address nftAddress, uint256 tokenId, uint256 price);
error ItemNotForSale(address nftAddress, uint256 tokenId);
error NotListed(address nftAddress, uint256 tokenId);
error AlreadyListed(address nftAddress, uint256 tokenId);
error NoProceeds();
error NotOwner();
error NotApprovedForMarketplace();
error PriceMustBeAboveZero();

event ItemListed(address indexed seller, address indexed nftAddress, uint256 indexed tokenId, uint256 price);
event Purchase(address indexed buyer, address indexed nftAddr, uint256 indexed tokenId, uint256 price);
event Revoke(address indexed seller, address indexed nftAddr, uint256 indexed tokenId);    
event Update(address indexed seller, address indexed nftAddr, uint256 indexed tokenId, uint256 newPrice);
event NftReceived(address indexed _from, address indexed _to, uint256 indexed _tokenId, bytes _data);



// For a full decentralized nft market
contract NftMarket is IERC721Receiver, ReentrancyGuard {

    // 定义order结构体
    struct Order{
        address owner;  //卖家 seller
        uint256 price; 
    }


    // NFT Order映射
    mapping(address => mapping(uint256 => Order)) private nftList;


    modifier isOwner(
        address nftAddress,
        uint256 tokenId,
        address spender
    ) {
        IERC721 nft = IERC721(nftAddress);
        address owner = nft.ownerOf(tokenId);
        if (spender != owner) {
            revert NotOwner();
        }
        _;
    }

    modifier notListed(
        address nftAddress,
        uint256 tokenId
    ) {
        Order memory listing = nftList[nftAddress][tokenId];
        if (listing.price > 0) {
            revert AlreadyListed(nftAddress, tokenId);
        }
        _;
    }

    modifier isListed(address nftAddress, uint256 tokenId) {
        Order memory listing = nftList[nftAddress][tokenId];
        if (listing.price <= 0) {
            revert NotListed(nftAddress, tokenId);
        }
        _;
    }


    // 实现{IERC721Receiver}的onERC721Received，能够接收ERC721代币
    function onERC721Received(
        address operator,
        address from,
        uint tokenId,
        bytes calldata data
    ) public  override returns (bytes4){
        emit NftReceived(from, address(this), tokenId, data); // 触发事件记录转移
        return IERC721Receiver.onERC721Received.selector;
    }

    // 用户使用ETH购买NFT。因此，合约需要实现fallback()函数来接收ETH
    // fallback() external payable{}
    fallback() external payable{}
    
    // 实现receive ether函数来处理进入合约的以太坊
    receive() external payable {
        // 处理逻辑，例如记录收到的以太坊等
    }


    // 挂单: 卖家上架NFT，合约地址为_nftAddress，tokenId为_tokenId，价格_price为以太坊（单位是wei）
    function listItem(
        address _nftAddress,
        uint256 _tokenId,
        uint256 _price
    )
        external
        notListed(_nftAddress, _tokenId)
        isOwner(_nftAddress, _tokenId, msg.sender)
    {
        // require(_price > 0); // 价格大于0
        if (_price <= 0) {
            revert PriceMustBeAboveZero();
        }
        IERC721 _nft = IERC721(_nftAddress);  // 声明IERC721接口合约变量
        

        Order storage _order = nftList[_nftAddress][_tokenId]; //设置NF持有人和价格
        _order.owner = msg.sender;
        _order.price = _price;

        // require(_nft.getApproved(_tokenId) == address(this), "Need Approval"); // 合约得到授权
        // 挂单时将 NFT 转移给合约比较常见
        // 将NFT转账到合约 safeTransferFrom用来转移NFT，**功能和 transferFrom一样，但是一些要求，如果receiver是一个合约，那么该合约需要实现ERC721TokenReceiver**
        _nft.safeTransferFrom(msg.sender, address(this), _tokenId);




        emit ItemListed(msg.sender, _nftAddress, _tokenId, _price);
    }



    // 撤单： 卖家取消挂单
    function revoke(address _nftAddr, uint256 _tokenId) 
        public 
        isOwner(_nftAddr, _tokenId, msg.sender)
        isListed(_nftAddr, _tokenId)
    {
        Order storage _order = nftList[_nftAddr][_tokenId]; // 取得Order        
        require(_order.owner == msg.sender, "Not Owner"); // 必须由持有人发起
        // 声明IERC721接口合约变量
        IERC721 _nft = IERC721(_nftAddr);

        // 使用修饰器替代判断
        // require(_nft.ownerOf(_tokenId) == address(this), "Invalid Order"); // NFT在合约中
        
        // 将NFT转给卖家
        _nft.safeTransferFrom(address(this), msg.sender, _tokenId);
        delete nftList[_nftAddr][_tokenId]; // 删除order
        
        // 释放Revoke事件
        emit Revoke(msg.sender, _nftAddr, _tokenId);
    }


    // 调整价格: 卖家调整挂单价格
    function update(address _nftAddr, uint256 _tokenId, uint256 _newPrice) 
        public 
        isListed(_nftAddr, _tokenId)
        nonReentrant
        isOwner(_nftAddr, _tokenId, msg.sender) //必须由持有人发起
    {
        require(_newPrice > 0, "Invalid Price"); // NFT价格大于0
        Order storage _order = nftList[_nftAddr][_tokenId]; // 取得Order        

        // 声明IERC721接口合约变量
        // IERC721 _nft = IERC721(_nftAddr);
        // require(_nft.ownerOf(_tokenId) == address(this), "Invalid Order"); // NFT在合约中
        
        // 调整NFT价格
        _order.price = _newPrice;
        
        // 释放Update事件
        emit Update(msg.sender, _nftAddr, _tokenId, _newPrice);
    }


    // 购买: 买家购买NFT，合约为_nftAddr，tokenId为_tokenId，调用函数时要附带ETH
    function purchase(address _nftAddr, uint256 _tokenId) 
        payable 
        public
        isListed(_nftAddr, _tokenId)
        nonReentrant
    {
        Order memory _order = nftList[_nftAddr][_tokenId]; // 取得Order        
        require(_order.price > 0, "Invalid Price"); // NFT价格大于0
        require(msg.value >= _order.price, "Increase price"); // 购买价格大于标价
        // 声明IERC721接口合约变量
        IERC721 _nft = IERC721(_nftAddr);
        require(_nft.ownerOf(_tokenId) == address(this), "Invalid Order"); // NFT在合约中

        // 将NFT转给买家
        _nft.safeTransferFrom(address(this), msg.sender, _tokenId);
        // 将ETH转给卖家，多余ETH给买家退款
        payable(_order.owner).transfer(_order.price);
        payable(msg.sender).transfer(msg.value-_order.price);

        delete nftList[_nftAddr][_tokenId]; // 删除order

        // 释放Purchase事件
        emit Purchase(msg.sender, _nftAddr, _tokenId, msg.value);
    }


}