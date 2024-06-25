// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

error NotListed(address nftAddress, uint256 tokenId);
error NotOwner();
error PriceMustAboveZero();
error NoEnoughTokenApproved();

event ItemListed(address indexed seller, address indexed nftAddress, uint256 indexed tokenId, uint256 price);
event Purchase(address indexed buyer, address indexed nftAddr, uint256 indexed tokenId, uint256 price);
event Revoke(address indexed seller, address indexed nftAddr, uint256 indexed tokenId);    
event ItemUpdated(address indexed seller, address indexed nftAddr, uint256 indexed tokenId, uint256 newPrice);
event NftReceived(address indexed _from, address indexed _to, uint256 indexed _tokenId, bytes _data);

contract NFTMarket is IERC721Receiver, ReentrancyGuard{
    IERC20 token;
    address private _owner;

    constructor(address tokenAddr) {
        token = IERC20(tokenAddr);
        _owner = msg.sender;
    }

    struct Order{
        address owner;  //卖家 seller
        uint256 price;
        uint256 ts;
    }

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

    modifier isSeller(address nftAddress, uint256 tokenId, address seller) {
        Order memory order = nftList[nftAddress][tokenId];
        if (order.price <= 0) {
            revert NotListed(nftAddress, tokenId);
        }
        if(order.owner!=seller){
            revert NotOwner();
        }
        _;
    }


    // NFT Order映射
    mapping(address => mapping(uint256 => Order)) private nftList;
    
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

    function getToken() public view returns(address){
        return address(token);
    }

    function getNftSellInfo(address _nftAddress, uint256 _tokenId) public view returns (Order memory){
        return nftList[_nftAddress][_tokenId];
    }

    // 挂单: 卖家上架NFT，合约地址为_nftAddress，tokenId为_tokenId，价格_price为以太坊（单位是wei）
    function listItem(address _nftAddress, uint256 _tokenId, uint256 _price) external
        isOwner(_nftAddress, _tokenId, msg.sender)
    {
        // require(_price > 0); // 价格大于0
        if (_price <= 0) {
            revert PriceMustAboveZero();
        }
        IERC721 _nft = IERC721(_nftAddress);  // 声明IERC721接口合约变量

        Order storage _order = nftList[_nftAddress][_tokenId]; //设置NF持有人和价格
        _order.owner = msg.sender;
        _order.price = _price;
        _order.ts = block.timestamp;

        // require(_nft.getApproved(_tokenId) == address(this), "Need Approval"); // 合约得到授权
        // 挂单时将 NFT 转移给合约比较常见
        // 将NFT转账到合约 safeTransferFrom用来转移NFT，**功能和 transferFrom一样，但是一些要求，如果receiver是一个合约，那么该合约需要实现ERC721TokenReceiver**
        _nft.safeTransferFrom(msg.sender, address(this), _tokenId);
        // _nft.approve(address(this), _tokenId);
        emit ItemListed(msg.sender, _nftAddress, _tokenId, _price);
    }

    // 撤单： 卖家取消挂单
    function revoke(address _nftAddr, uint256 _tokenId) 
        public 
        isSeller(_nftAddr, _tokenId, msg.sender)
    {
        Order storage _order = nftList[_nftAddr][_tokenId]; 
        // 声明IERC721接口合约变量
        IERC721 _nft = IERC721(_nftAddr);
        require(_nft.ownerOf(_tokenId) == address(this), "Invalid Order"); // NFT在合约中

        // 将NFT转给卖家
        _nft.safeTransferFrom(address(this), msg.sender, _tokenId);
        delete nftList[_nftAddr][_tokenId]; // 删除order

        // 释放Revoke事件
        emit Revoke(msg.sender, _nftAddr, _tokenId);
    }


    // 调整价格: 卖家调整挂单价格
    function update(address _nftAddr, uint256 _tokenId, uint256 _newPrice) public 
        nonReentrant
        isSeller(_nftAddr, _tokenId, msg.sender) //必须由持有人发起
    {
        if (_newPrice <= 0) {
            revert PriceMustAboveZero();
        }
        Order storage _order = nftList[_nftAddr][_tokenId]; // 取得Order        

        // 声明IERC721接口合约变量
        IERC721 _nft = IERC721(_nftAddr);
        require(_nft.ownerOf(_tokenId) == address(this), "Invalid Order"); // NFT在合约中

        // 调整NFT价格
        _order.price = _newPrice;

        // 释放Update事件
        emit ItemUpdated(msg.sender, _nftAddr, _tokenId, _newPrice);
    }
    
    // 购买: 买家购买NFT，合约为_nftAddr，tokenId为_tokenId
    function purchase(address _nftAddr, uint256 _tokenId) public nonReentrant {
        Order memory _order = nftList[_nftAddr][_tokenId]; // 取得Order        
        if(_order.price<=0){
            revert NotListed(_nftAddr, _tokenId);
        }
        // require(_order.price > 0, "Invalid Price"); // NFT价格大于0
        // 声明IERC721接口合约变量
        IERC721 _nft = IERC721(_nftAddr);
        if(_nft.ownerOf(_tokenId) != address(this)){
            revert NotListed(_nftAddr, _tokenId);
        }

        uint256 allow = token.allowance(msg.sender, address(this));
        if(allow < _order.price){
            revert NoEnoughTokenApproved();
        }
        // 将NFT转给买家
        token.transferFrom(msg.sender, _order.owner, _order.price);
        _nft.safeTransferFrom(address(this), msg.sender, _tokenId);
        delete nftList[_nftAddr][_tokenId]; // 删除order
        // 释放Purchase事件
        emit Purchase(msg.sender, _nftAddr, _tokenId, _order.price);
    }


    modifier OnlyOwner() {
        require(msg.sender == _owner);
        _;
    }

    function revokeByAdmin(address _nftAddr, uint256 _tokenId) public OnlyOwner { 
        Order storage _order = nftList[_nftAddr][_tokenId];
        if(_order.owner==address(0)){
            revert NotListed(_nftAddr, _tokenId);
        }
        // 声明IERC721接口合约变量
        IERC721 _nft = IERC721(_nftAddr);
        if(_nft.ownerOf(_tokenId) != address(this)){
            delete nftList[_nftAddr][_tokenId];
            return;
        }
        
        _nft.safeTransferFrom(address(this), _order.owner, _tokenId);
        delete nftList[_nftAddr][_tokenId]; // 删除order

        // 释放Revoke事件
        emit Revoke(msg.sender, _nftAddr, _tokenId);
    }


  
//    function GetUserTokenBalance() public view returns(uint256){ 
//        return token.balanceOf(msg.sender);// balancdOf function is already declared in ERC20 token function
//    }
   
   
//    function Approvetokens(uint256 _tokenamount) public returns(bool){
//        token.approve(address(this), _tokenamount);
//        return true;
//    }
   
   
//    function GetAllowance() public view returns(uint256){
//        return token.allowance(msg.sender, address(this));
//    }
   
//    function AcceptPayment(uint256 _tokenamount) public returns(bool) {
//        require(_tokenamount > GetAllowance(), "Please approve tokens before transferring");
//        token.transfer(address(this), _tokenamount);
//        return true;
//    }
   
   
//    function GetContractTokenBalance() public OnlyOwner view returns(uint256){
//        return token.balanceOf(address(this));
//    }
}