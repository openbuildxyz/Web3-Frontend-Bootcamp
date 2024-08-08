// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "forge-std/console.sol";

contract NFTDemo is ERC721 {

    address internal owner;
    string public baseTokenURI;

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

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    function mint(uint tokenId,string memory _baseTokenURI) external {
        require(tokenId>0 && tokenId<Max,"contract:::NFTDemo::NFTDemo:tokenId out of range");
        baseTokenURI = _baseTokenURI;
        // _baseURI();
        _mint(msg.sender, tokenId);
    }

    function getOwner(uint256 tokenId) public view returns (address) {
        // console.log("12");
        // return address(msg.sender);
        return ownerOf(tokenId);
        // return _baseURI();
    }

    function safeTransferFrom(address from,address to,uint256 tokenId) public override {
        // console.log("1");
        // console.log("2");
        // console.log(ownerOf(1));
        // console.log("3");
        super.safeTransferFrom(from,to,tokenId);
    }

}