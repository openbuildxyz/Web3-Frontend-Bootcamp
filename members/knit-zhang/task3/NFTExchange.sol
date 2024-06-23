//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./interface/IMarket.sol";

contract Market is  IMarket{
    struct Item {
        address collectionAddress;
        uint256 tokenId;
        address owner;
        uint256 price;
        bool selling;
    }
    mapping (uint256 => Item) private _shelf;
    uint256[] private _listedCollection;
    address private _payment;
    IERC20 private _token;

    constructor(address token) {
        _payment = token;
        _token = IERC20(token);
    }

    function getItem(uint256 tokenId) public view returns(address, uint256, address, uint256, bool) {
        Item memory token = _shelf[tokenId];
        return (token.collectionAddress, token.tokenId, token.owner, token.price, token.selling);
    }

    function getListedItem() external view returns (uint256[] memory) {
        return _listedCollection;
    }

    /**
	 * 上架NFT
	 * @param collection NFT合约地址
	 * @param tokenId NFT唯一id
	 * @param price 上架价格
	 */
    function listCollection(address collection, uint256 tokenId, uint256 price) external {
        IERC721 _nft = IERC721(collection);
        require(_nft.ownerOf(tokenId) == msg.sender, "Ownership error");
        _shelf[tokenId] = Item(collection, tokenId, _nft.ownerOf(tokenId), price, true);
        require(_nft.getApproved(tokenId) == address(this));
        _listedCollection.push(tokenId);
        emit ListCollection(tokenId, price);
    }

    function deleteById(uint256 tokenId) public  {
        for (uint32 i = 0; i < _listedCollection.length; i++) {
            if (i == tokenId) {
                _listedCollection[i] = _listedCollection[_listedCollection.length - 1];
                _listedCollection.pop();
            }
        }
    }

    function unlistCollection(address collection, uint256 tokenId) external {
        IERC721 _nft = IERC721(collection);
        require(_shelf[tokenId].selling);
        require(_nft.ownerOf(tokenId) == msg.sender);
        emit UnlistCollection(tokenId);
        delete _shelf[tokenId];
        deleteById(tokenId);
    }


    /**
	 * 购买NFT
	 * @param collection NFT合约地址
	 * @param tokenId NFT唯一id
	 */
    function buyCollection(address collection, uint256 tokenId) external{
        Item storage selectedCollection = _shelf[tokenId];
        require(selectedCollection.selling, "Sold Out");
        if (_token.balanceOf(msg.sender) < selectedCollection.price) {
            revert("Insufficient balance");
        }
        require(_token.approve(address(this), selectedCollection.price), "Unauthenticated to approve");   
        require(_token.transferFrom(msg.sender, selectedCollection.owner, selectedCollection.price), "Unauthenticated to transfer");  
        IERC721 nft = IERC721(collection);
        nft.safeTransferFrom(selectedCollection.owner, msg.sender, tokenId);
        selectedCollection.selling = false;
        deleteById(tokenId);
        emit transferCollection(msg.sender, selectedCollection.owner, tokenId);

    }
}