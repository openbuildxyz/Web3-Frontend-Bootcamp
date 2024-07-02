// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./TestToken.sol";
import "./TestNFT.sol";

contract NFTmarket {
    TestToken testToken;
    TestNFT testNFT;
    mapping(address => TestNFT[]) nftAddresss;
    mapping(TestNFT => NFTInfo) nftInfos;

    struct NFTInfo {
        uint256 tokenID;
        uint256 price;
    }

    constructor(address _testToken) {
        testToken = TestToken(_testToken);
    }

    function sellNFT(
        TestNFT _nftAddress,
        uint256 tokenID,
        uint256 price
    ) public {
        testNFT = TestNFT(_nftAddress);
        nftAddresss[msg.sender].push(testNFT);
        nftInfos[testNFT] = NFTInfo({tokenID: tokenID, price: price});

        // testNFT.approve(address(this), tokenID);
    }

    function buyNFT(
        TestNFT _nftAddress,
        uint256 tokenID,
        uint256 price
    ) public {
        require(nftInfos[_nftAddress].price > price, "error");
        address nftOwner = testNFT.ownerOf(tokenID);
        testNFT.safeTransferFrom(nftOwner, msg.sender, tokenID);
        testToken.transferFrom(msg.sender, nftOwner, price);
    }
}
