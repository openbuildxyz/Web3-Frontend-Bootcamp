// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./IERC721.sol";

contract ERC721 is IERC721 {
    string public name = "myNFT";
    string public symbol = "NFT";

    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => address) private _owners;
    mapping(uint256 => address) private _tokenApprovals;
    mapping(address => mapping(address => bool)) private _operatorApprovals;
    uint256[] private _allTokens;
    mapping(address => uint256) private _balances;
    uint256 private _currentTokenId = 0; // 初始化_currentTokenId为0

    address private _owner; // 合约拥有者的地址

    constructor() {
        _owner = msg.sender; // 在构造函数中设置合约拥有者
    }

    // 只有合约拥有者可以执行的函数
    modifier onlyOwner() {
        require(msg.sender == _owner, "Only owner can perform this action");
        _;
    }

    // 铸造新Token并分配给msg.sender
    function mint() public  {
        _currentTokenId++; // 递增当前Token ID
        require(_owners[_currentTokenId] == address(0), "Token already minted");

        _owners[_currentTokenId] = msg.sender;
        _allTokens.push(_currentTokenId);
        _balances[msg.sender]++;

        emit Transfer(address(0), msg.sender, _currentTokenId);
    }

    // 设置Token的URI
    function setTokenURI(uint256 tokenId, string memory _uri) public onlyOwner {
        require(_exists(tokenId), "Token does not exist");
        _tokenURIs[tokenId] = _uri;
    }

    // 检查Token是否存在
    function _exists(uint256 tokenId) internal view returns (bool) {
        return _owners[tokenId] != address(0);
    }

    // 获取Token的当前所有者
    function ownerOf(uint256 tokenId) public view override returns (address) {
        return _owners[tokenId];
    }

    // 批准一个地址对特定Token的操作权限
    function approve(address to, uint256 tokenId) public override {
        address owner = ownerOf(tokenId);
        require(owner == msg.sender || isApprovedForAll(owner, msg.sender), "Not owner nor approved for all");
        _tokenApprovals[tokenId] = to;
        emit Approval(owner, to, tokenId);
    }

    // 获取被批准操作特定Token的地址
    function getApproved(uint256 tokenId) public view override returns (address) {
        require(_exists(tokenId), "Token does not exist");
        return _tokenApprovals[tokenId];
    }

    // 设置地址为所有者的全局操作员
    function setApprovalForAll(address operator, bool approved) public override {
        _operatorApprovals[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    // 检查地址是否是所有者的全局操作员
    function isApprovedForAll(address owner, address operator) public view override returns (bool) {
        return _operatorApprovals[owner][operator];
    }

    // 从地址from转让Token给地址to
    function transferFrom(address from, address to, uint256 tokenId) public override {
        require(_exists(tokenId), "Token does not exist");
        require(_owners[tokenId] == from, "Sender is not the owner");
        require(msg.sender == getApproved(tokenId) || isApprovedForAll(from, msg.sender), "Not approved");

        _transferFrom(from, to, tokenId);
    }

    // 内部函数，用于转移Token所有权
    function _transferFrom(address from, address to, uint256 tokenId) private {
        _tokenApprovals[tokenId] = address(0); // 清除批准
        _owners[tokenId] = to; // 转移所有权
        _balances[from]--;
        _balances[to]++;

        emit Transfer(from, to, tokenId);
    }

    // 获取一个地址拥有的Token数量
    function balanceOf(address owner) public view override returns (uint256) {
        return _balances[owner];
    }

    // 获取Token的URI
    function tokenURI(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return _tokenURIs[tokenId];
    }

    // 允许合约拥有者更改合约拥有者
    function changeOwner(address newOwner) public onlyOwner {
        _owner = newOwner;
    }
}