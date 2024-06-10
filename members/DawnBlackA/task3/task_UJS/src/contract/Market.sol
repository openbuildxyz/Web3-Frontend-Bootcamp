// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.13;

import "src/contract/ERC20.sol";
import "src/contract/NFTDemo.sol";

contract Market{
    
    address internal erc20;
    // address internal nftDemo;

    mapping (uint => uint) price;
    mapping (uint => bool) inSelling;
    
    constructor(address _ERC20) {
        erc20 = _ERC20;
        // nftDemo = _NFTDemo;
    }

    function upload(uint tokenId,uint _price,address nftDemo) external {
        require(NFTDemo(nftDemo).ownerOf(tokenId) == msg.sender,"contract:::Market::upload:You need to be the Owner of the token.");
        inSelling[tokenId] = true;
        price[tokenId] = _price;
    }

    function buy(uint tokenId,address nftDemo) external {
        require(inSelling[tokenId],"contract:::Market::buy:The token isn't in selling.");
        address owner = NFTDemo(nftDemo).ownerOf(tokenId);
        ERC20(erc20).transferFrom(msg.sender, owner, price[tokenId]);
        NFTDemo(nftDemo).safeTransferFrom(owner, msg.sender, tokenId);
    }
}