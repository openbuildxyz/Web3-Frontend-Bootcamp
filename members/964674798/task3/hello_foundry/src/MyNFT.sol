// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// 继承了ERC721和NFC专属人操作合约
// uint256是一种无符号整数类型，可以存储256位非负整数。例如计数器、标识符、余额
// modifier 可以使用modifier函数来写修饰符鞥
// contract MyNFT is ERC721, Ownable {
//     using Counters for Counters.Counter;
//     Counters.Counter private _tokenIds;

//     // 第一个是代币名称，第二个是代币符号。
//     constructor() ERC721("HfqNFT", "HNFT") {}

//     function mintNFT(address recipient) public onlyOwner returns (uint256) {
//         _tokenIds.increment();
//         uint256 newItemId = _tokenIds.current();
//         _mint(recipient, newItemId);
//         return newItemId;
//     }
// }

contract MyNFT is ERC721, Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721('HfqNFT','HNT') {
         _transferOwnership(msg.sender);
    }

    // 构造代币
    function mintNFT(address buerAddress) public onlyOwner returns (uint256){
         _tokenIds.increment();
         uint256 newItemId = _tokenIds.current();
         _mint(buerAddress, newItemId);
         return newItemId;
    }
}