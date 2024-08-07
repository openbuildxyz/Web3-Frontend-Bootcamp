// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.13;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "src/contract/ERC20.sol";
import "src/contract/NFTDemo.sol";

contract Market{
    
    address internal erc20;
    uint uploadCount = 0;
    mapping (address => mapping (uint => uint)) nftID;
    mapping (uint => address) ownerAddress;
    mapping (uint => address) nftAddress;
    mapping (uint => uint) nftTokenId;
    mapping (uint => uint) price;
    mapping (uint => string) tokenURI;
    mapping (uint => bool) inSelling;

    struct NFT {
        uint NFTId;
        uint TokenId;
        address Address;
        address Owner;
        uint Price;
        string TokenURI;
        bool InSelling;
    }
    
    NFT[] public NFTs;

    constructor(address _ERC20) {
        erc20 = _ERC20;
        // nftDemo = _NFTDemo;
    }

    function upload(uint tokenId,uint _price,address nftDemo) external {

        require(NFTDemo(nftDemo).ownerOf(tokenId) == msg.sender,"contract:::Market::upload:You need to be the Owner of the token.");
        require(!inSelling[nftID[nftDemo][tokenId]],"contract:::Market::upload:NFT has been uploaded.");


        uint nftId = uploadCount++;
        nftID[nftDemo][tokenId] = nftId;
        ownerAddress[nftId] = NFTDemo(nftDemo).ownerOf(tokenId);
        nftAddress[nftId] = nftDemo;
        nftTokenId[nftId] = tokenId;
        price[nftId] = _price;
        tokenURI[nftId] = NFTDemo(nftDemo).tokenURI(tokenId);
        inSelling[nftId] = true;

        NFTs.push(NFT({NFTId: nftId,TokenId: nftTokenId[nftId],Address: nftAddress[nftId],Owner: ownerAddress[nftId],Price: price[nftId],TokenURI: tokenURI[nftId],InSelling: inSelling[nftId]}));
    }

    function download(uint _nftId) external {
        require(ownerAddress[_nftId] == msg.sender,"contract:::Market::download:You need to be the Owner of the token.");
        inSelling[_nftId] = false;
        NFTs[_nftId].InSelling = inSelling[_nftId];
    }

    function buy(uint _nftId) external {
        require(inSelling[_nftId],"contract:::Market::buy:The token isn't in selling.");
        require(ownerAddress[_nftId] != msg.sender, "contract:::Market::buy:You are the owner of the NFT.");
        address owner = ownerAddress[_nftId];

        // ERC20(erc20).approve(address(this), price[_nftId]);
        ERC20(erc20).transferFrom(msg.sender, owner, price[_nftId]);

        NFTDemo(nftAddress[_nftId]).safeTransferFrom(owner, msg.sender, nftTokenId[_nftId]);
        inSelling[_nftId] = false;
        NFTs[_nftId].InSelling = inSelling[_nftId];
    }

    function getAllNFTs() external view returns (NFT[] memory) {
        return NFTs;
    }


    // function getNFTokenId(uint _nftId) external view returns(uint) {
    //     return nftTokenId[_nftId];
    // }

    // function getInSelling(uint _nftId) external view returns(bool) {
    //     return inSelling[_nftId];
    // }

    // function getNFTAddress(uint _nftId) external view returns(address) {
    //     return nftAddress[_nftId];
    // }

    // function getPrice(uint _nftId) external view returns(uint) {
    //     return price[_nftId];
    // }

    // function getOwner(uint _nftId) external view returns(address) {
    //     return ownerAddress[_nftId];
    // }

    function getUploadCount() external view returns (uint) {
        return uploadCount;
    }
    
}