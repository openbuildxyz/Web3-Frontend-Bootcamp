// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTContract is ERC721 {
    //在 Solidity 中，using ... for 语句是一种语法糖，允许将库函数应用到特定类型的变量上。这种方式可以简化代码，使其更易读和更易维护。
    //使用 Counters 库中的函数来操作 Counters.Counter 类型的变量。
    // 将 Counters 库中的函数附加到 Counters.Counter 类型的变量上。这样一来，Counters.Counter 类型的变量可以直接调用 Counters 库中的函数，
    // 就像这些函数是 Counters.Counter 结构体的一部分一样。
    
    //Solidity 中的库（Library）和结构体（Struct）是两种不同的概念。结构体是数据的集合，而库则是一组函数的集合，库函数可以操作结构体。
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("NFTContract","NCT"){
        _tokenIdCounter.increment();
    }
    
    //调用 mint 函数，铸造新的 NFT。每次铸造都会生成一个新的唯一标识符（tokenId），并将 NFT 铸造给指定地址。
    function mint(address to) public{
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        //在mint基础上确保对方收到
        _safeMint(to,tokenId);
    }

    //burn
}