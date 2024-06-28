// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../src/Marketplace.sol";

// contract TimeDependentContract {
//     uint256 public lastUpdated;

//     function updateTimestamp() public {
//         lastUpdated = block.timestamp;
//     }
// }

// Custom ERC20 token for testing
contract TestToken is ERC20 {
    constructor() ERC20("TestToken", "TTK") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}

// Custom ERC721 token for testing
contract TestNFT is ERC721 {
    uint256 private _nextTokenId;

    constructor() ERC721("TestNFT", "TNT") {}

    function mint() external returns (uint256) {
        // Ensure that each newly minted NFT has a unique ID.
        uint256 newTokenId = _nextTokenId++;

        _safeMint(msg.sender, newTokenId);

        return newTokenId;
    }
}

contract NFTMarketplaceTest is Test {
    // TimeDependentContract public timeDependent;
    NFTMarketplace public marketplace;
    TestToken public paymentToken;
    TestNFT public nft;

    address public lily = address(0x123);
    address public finn = address(0x456);
    uint256 public initTokenCount = 1000 * 10 ** 18;
    uint256 public nftPrice = 100 * 10 ** 18;
    string public tokenURI = "https://caven.dev";

    function setUp() public {
        // Deploy the custom ERC20 token used for payment
        paymentToken = new TestToken();
        // Deploy the custom ERC721 token to mint NFTs
        nft = new TestNFT();
        // Deploy the NFT marketplace contract
        marketplace = new NFTMarketplace(paymentToken);
        // timeDependent = new TimeDependentContract();

        // Allocate some test tokens to Lily and Finn
        paymentToken.transfer(lily, initTokenCount);
        paymentToken.transfer(finn, initTokenCount);
    }

    function testBalance() public view {
        // Check that the balance is correct
        uint256 lilyBalance = paymentToken.balanceOf(lily);
        uint256 finnBalance = paymentToken.balanceOf(finn);
        assertEq(lilyBalance, initTokenCount);
        assertEq(finnBalance, initTokenCount);
    }

    function testListNFT() public {
        // timeDependent.updateTimestamp();

        // Init timestamp
        // uint256 initTimestamp = timeDependent.lastUpdated();
        uint256 tokenId = _mintNFT(lily);
        _setApprovalForAll(lily);
        uint256 listingId = _listNFT(lily, tokenId);

        // Use Foundry's `warp` function to advance time
        // vm.warp(block.timestamp + 1000);

        // Check if the NFT is listed correctly
        NFTMarketplace.NftInfo memory listedNft = marketplace.getListedNft(listingId);
        assertEq(listedNft.owner, lily);
        assertEq(listedNft.nftContract, address(nft));
        assertEq(listedNft.tokenId, tokenId);
        assertEq(listedNft.price, nftPrice);
        assertEq(listedNft.isListed, true);
        assertEq(listedNft.isSold, false);
        assertEq(listedNft.listedAt, block.timestamp);
        assertEq(nft.isApprovedForAll(lily, address(marketplace)), true);
    }

    function testReListNFT() public {
        uint256 tokenId = _mintNFT(lily);
        _setApprovalForAll(lily);
        uint256 listingId = _listNFT(lily, tokenId);
        uint256 newNftPrice = 120 * 10 ** 18;

        // Delist
        vm.prank(lily);
        marketplace.delistNFT(listingId);

        // Relist
        vm.prank(lily);
        marketplace.listNFT(listingId, newNftPrice);

        NFTMarketplace.NftInfo[] memory allNfts = marketplace.getAllNfts();
        assertEq(allNfts.length, 1);

        // Check if the NFT is listed correctly
        NFTMarketplace.NftInfo memory listedNft = marketplace.getListedNft(listingId);
        assertEq(listedNft.owner, lily);
        assertEq(listedNft.nftContract, address(nft));
        assertEq(listedNft.tokenId, tokenId);
        assertEq(listedNft.price, newNftPrice);
        assertEq(listedNft.isListed, true);
        assertEq(listedNft.isSold, false);
        assertEq(listedNft.listedAt, block.timestamp);
        assertEq(nft.isApprovedForAll(lily, address(marketplace)), true);
    }

    function testDelistNFT() public {
        uint256 tokenId = _mintNFT(lily);
        _setApprovalForAll(lily);
        uint256 listingId = _listNFT(lily, tokenId);

        vm.prank(lily);
        marketplace.delistNFT(listingId);

        NFTMarketplace.NftInfo memory listedNft = marketplace.getListedNft(listingId);
        assertEq(listedNft.isListed, false);
        assertEq(listedNft.isSold, false);
    }

    function testBuyNFT() public {
        uint256 tokenId = _mintNFT(lily);
        _setApprovalForAll(lily);
        uint256 listingId = _listNFT(lily, tokenId);

        // Finn approved the transfer of his tokens on the marketplace to buy NFTs.
        vm.prank(finn);
        paymentToken.approve(address(marketplace), nftPrice);

        // Check init balances
        uint256 lilyInitBalance = paymentToken.balanceOf(lily);
        uint256 finnInitBalance = paymentToken.balanceOf(finn);

        // Buy the NFT
        vm.prank(finn);
        marketplace.buyNFT(listingId);

        // Check now balances
        uint256 lilyNowBalance = paymentToken.balanceOf(lily);
        uint256 finnNowBalance = paymentToken.balanceOf(finn);
        assertEq(lilyNowBalance, lilyInitBalance + nftPrice);
        assertEq(finnNowBalance, finnInitBalance - nftPrice);

        // Check if the new owner of the NFT is Finn
        assertEq(nft.ownerOf(tokenId), finn);

        // Check the listed NFT
        NFTMarketplace.NftInfo memory listedNft = marketplace.getListedNft(listingId);
        assertEq(listedNft.owner, finn);
        assertEq(listedNft.nftContract, address(nft));
        assertEq(listedNft.tokenId, tokenId);
        assertEq(listedNft.price, nftPrice);
        assertEq(listedNft.isListed, false);
        assertEq(listedNft.isSold, true);
    }

    function testGetAllListings() public {
        uint256 tokenId = _mintNFT(lily);
        _setApprovalForAll(lily);
        uint256 listingId = _listNFT(lily, tokenId);

        NFTMarketplace.NftInfo[] memory allNfts = marketplace.getAllNfts();

        assertEq(allNfts.length, 1);
        assertEq(allNfts[listingId].owner, lily);
        assertEq(allNfts[listingId].nftContract, address(nft));
        assertEq(allNfts[listingId].tokenId, listingId);
        assertEq(allNfts[listingId].price, nftPrice);
        assertEq(allNfts[listingId].isListed, true);
        assertEq(allNfts[listingId].isSold, false);
    }

    function testGetListedNFT() public {
        uint256 tokenId = _mintNFT(lily);
        _setApprovalForAll(lily);
        uint256 listingId = _listNFT(lily, tokenId);

        NFTMarketplace.NftInfo memory listedNft = marketplace.getListedNft(listingId);

        assertEq(listedNft.owner, lily);
        assertEq(listedNft.nftContract, address(nft));
        assertEq(listedNft.tokenId, tokenId);
        assertEq(listedNft.price, nftPrice);
        assertEq(listedNft.isListed, true);
        assertEq(listedNft.isSold, false);
        assertEq(nft.isApprovedForAll(lily, address(marketplace)), true);
    }

    function _mintNFT(address owner) internal returns (uint256) {
        // Mint an NFT for owner
        vm.prank(owner);
        uint256 tokenId = nft.mint();

        return tokenId;
    }

    function _setApprovalForAll(address owner) internal {
        vm.prank(owner);
        nft.setApprovalForAll(address(marketplace), true);
    }

    function _listNFT(address owner, uint256 tokenId) internal returns (uint256) {
        // List the NFT on the marketplace
        vm.prank(owner);
        uint256 listingId = marketplace.listNFT(address(nft), tokenId, tokenURI, nftPrice);

        return listingId;
    }
}
