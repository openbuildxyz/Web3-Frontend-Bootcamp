// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./TestToken.sol";
import "./TestNFT.sol";

contract NFTmarket {
    TestToken testToken;
    mapping(address => mapping(uint256 => NFTInfo)) nftInfos;

    event sellNFTe(address, address, uint256, uint256);
    event buyNFTe(address, address, uint256, uint256, bool);

    struct NFTInfo {
        address seller;
        address nftContractAddress;
        uint256 tokenID;
        uint256 price;
        bool ifSell;
    }

    constructor(address _testToken) {
        testToken = TestToken(_testToken);
    }

    function sellNFT(
        address _nftContractAddress,
        uint256 tokenID,
        uint256 price
    ) public {
        require(price > 0, "The current price is not valid");
        TestNFT testNFT = TestNFT(_nftContractAddress);
        require(
            testNFT.ownerOf(tokenID) == msg.sender,
            "You are not currently nft Owner"
        );
        require(
            testNFT.isApprovedForAll(msg.sender, address(this)),
            "approve is error"
        );
        // testNFT.approve(address(this), tokenID);
        nftInfos[_nftContractAddress][tokenID] = NFTInfo({
            seller: msg.sender,
            nftContractAddress: _nftContractAddress,
            tokenID: tokenID,
            price: price,
            ifSell: false
        });
        emit sellNFTe(msg.sender, _nftContractAddress, tokenID, price);
    }

    function buyNFT(address _nftContractAddress, uint256 tokenID) public {
        NFTInfo memory nftInfo = nftInfos[_nftContractAddress][tokenID];
        require(!nftInfo.ifSell, "this nft is sell");
        require(
            testToken.transferFrom(msg.sender, nftInfo.seller, nftInfo.price),
            "Payment for NFT failed"
        );
        TestNFT testNFT = TestNFT(_nftContractAddress);
        testNFT.safeTransferFrom(nftInfo.seller, msg.sender, tokenID);
        nftInfo.ifSell = true;
        emit buyNFTe(
            msg.sender,
            _nftContractAddress,
            tokenID,
            nftInfo.price,
            nftInfo.ifSell
        );
    }
}
