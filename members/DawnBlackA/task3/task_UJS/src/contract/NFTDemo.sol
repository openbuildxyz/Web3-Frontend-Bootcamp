// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.13;

import "lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";

contract NFTDemo is ERC721 {

    address internal owner;

    constructor(string memory _name,string memory _symbol) ERC721(_name,_symbol){
        owner = msg.sender;
    }

    mapping (address => bool) admin;

    uint public Max = 10000;

    function setAdmin(address to) external {
        require(msg.sender == owner,"contract:::NFTDemo::NFTDemo:Owner Only.");
        admin[to] = true;
    }

    modifier adminOnly {
        require(admin[msg.sender],"contract:::NFTDemo::NFTDemo:Admin Only.");
        _;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://gateway.pinata.cloud/ipfs/QmQmUNjbauwtvurGEbgVyWQxphFkxMqbKwuvqvhBMHSz6r";
    }


    function mint(address to,uint tokenId) external {
        require(tokenId>0 && tokenId<Max,"contract:::NFTDemo::NFTDemo:tokenId out of range");
        _mint(to, tokenId);
    }

}