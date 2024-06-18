// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../src/Marketplace.sol";

// Custom ERC20 token for testing
contract TestToken is ERC20 {
    constructor() ERC20("TestToken", "TTK") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}

// Custom ERC721 token for testing
contract TestNFT is ERC721URIStorage {
    uint256 private _nextTokenId;

    constructor() ERC721("TestNFT", "TNT") {}

    // Only contract owners can call
    function mint(address to, string memory tokenURI) public returns (uint256) {
        uint256 newTokenId = _nextTokenId++;

        _mint(to, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        return newTokenId;
    }
}

contract CavenNFTMarketplaceTest is Test {
    CavenNFTMarketplace public marketplace;
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
        marketplace = new CavenNFTMarketplace(paymentToken);

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
        (uint256 tokenId, uint256 listingId) = _listNFT();
        // Check if the NFT is listed correctly
        (address seller, address nftContract, uint256 resTokenId, uint256 resPrice, bool isSold) =
            marketplace.listings(listingId);
        assertEq(seller, lily);
        assertEq(nftContract, address(nft));
        assertEq(resTokenId, tokenId);
        assertEq(resPrice, nftPrice);
        assertEq(isSold, false);
        assertEq(nft.ownerOf(tokenId), address(marketplace));
    }

    function testBuyNFT() public {
        (uint256 tokenId, uint256 listingId) = _listNFT();

        // Finn approves the marketplace to transfer his tokens and buy the NFT
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

        // Check if the listing is marked as sold
        (,,,, bool isSold) = marketplace.listings(listingId);
        assertTrue(isSold);
    }

    function _listNFT() internal returns (uint256, uint256) {
        // Mint an NFT for Lily and approve the marketplace for transfer
        uint256 tokenId = nft.mint(lily, tokenURI);

        // `vm.prank` sets `msg.sender` to Lily for the next call only
        vm.prank(lily);
        // Approve the marketplace for transfer
        nft.approve(address(marketplace), tokenId);

        // List the NFT on the marketplace
        vm.prank(lily);
        uint256 listingId = marketplace.listNFT(address(nft), tokenId, nftPrice);

        return (tokenId, listingId);
    }
}
