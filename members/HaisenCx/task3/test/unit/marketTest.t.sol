// SPDX-License-Identifier: MIT
import {HelperConfig} from "../../script/HelperConfig.s.sol";
import {Test, console} from "forge-std/Test.sol";
import {StdCheats} from "forge-std/StdCheats.sol";
import {DeployHaisenCx} from "../../script/DeployHaisenCx.s.sol";
import {HaisenNft} from "../../src/HaisenNft.sol";
import {HaisenToken} from "../../src/HaisenToken.sol";
import {HaisenNftMarket} from "../../src/HaisenNftMarket.sol";
import {VRFCoordinatorV2Mock} from "../mocks/VRFCoordinatorV2Mock.sol";
import {Vm} from "forge-std/Vm.sol";

pragma solidity ^0.8.20;

contract HaisenNftMarketTest is StdCheats, Test {
    uint64 subscriptionId;
    bytes32 gasLane;
    uint256 automationUpdateInterval;
    uint256 raffleEntranceFee;
    uint32 callbackGasLimit;
    address vrfCoordinatorV2;
    address public deployerAddress;

    address public WHITE_LIST_PLAYER1 = 0x7888b7B844B4B16c03F8daCACef7dDa0F5188645;
    address public WHITE_LIST_PLAYER2 = 0x1Bff9f9609b65127Bb631cd33Af14Cb47D6139Ae;
    address public NOT_WHITE_LIST_PLAYER1 = 0xcf8a64B0B1Dc8bAfBa95F806C78970B6Bb7e3BB5;
    address public OWNER = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;

    uint256 public constant STARTING_USER_BALANCE = 10 ether;
    HaisenNft haisenNft;
    HaisenToken haisenToken;
    HelperConfig helperConfig;
    HaisenNftMarket haisenMarket;

    function setUp() external {
        //vm.prank(OWNER);
        DeployHaisenCx depolyer = new DeployHaisenCx();
        DeployHaisenCx.DeployReturns memory deployReturns = depolyer.run();
        helperConfig = deployReturns.helperConfig;
        haisenNft = deployReturns.haisenNft;
        haisenToken = deployReturns.haisenToken;
        haisenMarket = deployReturns.haisenNftMarket;
        (vrfCoordinatorV2, gasLane, subscriptionId,,) = helperConfig.activeNetworkConfig();

        console.log(haisenToken.owner());
        console.log("balanceOf(OWNER): %s", haisenToken.balanceOf(OWNER));
        console.log("balanceOf(WHITE_LIST_PLAYER1): %s", haisenToken.balanceOf(WHITE_LIST_PLAYER1));
        deployerAddress = vm.addr(depolyer.depolyAddress());
        vm.prank(deployerAddress);
        haisenToken.transfer(WHITE_LIST_PLAYER2, 2010);
    }

    // test the encode and decode of abi
    function testABIEncodeAndDecode() public {
        uint256 value1 = 1222;
        string memory tokenURI =
            "https://white-left-chameleon-515.mypinata.cloud/ipfs/QmThBYjgDMGxwFnxxWH6WpQT8rM2RjphcXSvJcQWgRnJfF/81";
        bytes memory data = abi.encode(value1, tokenURI);
        console.log("value1: %s", value1);
        console.log("tokenURI: %s", tokenURI);

        console.logBytes(data);

        // 在另一个地方，解码bytes数组中的值
        (uint256 decodedValue1, string memory decodedtokenURI) = abi.decode(data, (uint256, string));
        console.log("decoded value1: %s", decodedValue1);
        console.log("decoded tokenURI: %s", decodedtokenURI);

        assertEq(value1, decodedValue1);
        assertEq(tokenURI, decodedtokenURI);
    }

    /////////////////////////
    ///     Functions     ///
    /////////////////////////

    /////////////////////////
    ///   getAllNFTs      ///
    /////////////////////////
    function testGetAllNFTsWhenInit() public {
        // when init, the length of orders should be 0
        assertEq(haisenMarket.getOrderLength(), 0);
        // when init, the length of orders should be 0
        assertEq(haisenMarket.getAllNFTs().length, 0);
    }

    ///////////////////////////////
    ///   onERC721Received      ///
    ///////////////////////////////
    modifier NftMinted() {
        vm.prank(WHITE_LIST_PLAYER1);
        bytes32[] memory proof = new bytes32[](2);
        proof[0] = hex"18e9989295f6079594319992851df70fa29f24a5033d9b327d4587a7bb0b5b8d";
        proof[1] = hex"4726e4102af77216b09ccd94f40daa10531c87c4d60bba7f3b3faf5ff9f19b3c";
        // 首次铸币应该成功
        vm.recordLogs();
        haisenNft.mintWhiteList(WHITE_LIST_PLAYER1, proof);
        Vm.Log[] memory entries = vm.getRecordedLogs();
        bytes32 requestId = entries[1].topics[2];
        VRFCoordinatorV2Mock(vrfCoordinatorV2).fulfillRandomWords(uint256(requestId), address(haisenNft));
        _;
    }

    function testOnERC721Received() public NftMinted {
        vm.prank(WHITE_LIST_PLAYER1);
        uint256 tokenId = 1;
        uint256 price = 100;
        string memory tokenUri = haisenNft.tokenURI(tokenId);
        bytes memory data = abi.encode(price, tokenUri);
        haisenMarket.onERC721Received(WHITE_LIST_PLAYER1, address(this), tokenId, data);
        assertEq(haisenMarket.getOrderLength(), 1);
        assertEq(haisenMarket.getAllNFTs().length, 1);
        assertEq(haisenMarket.isListed(tokenId), true);
    }

    ///////////////////////////////
    ///   changePrice           ///
    ///////////////////////////////
    function testChangePrice() public NftMinted {
        vm.prank(WHITE_LIST_PLAYER1);
        uint256 tokenId = 1;
        uint256 price = 100;
        string memory tokenUri = haisenNft.tokenURI(tokenId);
        bytes memory data = abi.encode(price, tokenUri);
        haisenMarket.onERC721Received(WHITE_LIST_PLAYER1, address(this), tokenId, data);

        uint256 newPrice = 200;
        haisenMarket.changePrice(tokenId, newPrice);
        assertEq(haisenMarket.getOrderLength(), 1);
        assertEq(haisenMarket.getAllNFTs().length, 1);
        assertEq(haisenMarket.isListed(tokenId), true);
        assertEq(haisenMarket.getOrder(tokenId).price, newPrice);
    }

    ///////////////////////
    ///   buy           ///
    ///////////////////////
    function testBuy() public NftMinted {
        vm.prank(WHITE_LIST_PLAYER1);
        uint256 tokenId = 1;
        uint256 price = 100;
        string memory tokenUri = haisenNft.tokenURI(tokenId);
        bytes memory data = abi.encode(price, tokenUri);
        vm.prank(WHITE_LIST_PLAYER1);
        haisenNft.safeTransferFrom(WHITE_LIST_PLAYER1, address(haisenMarket), tokenId, data);
        vm.startPrank(WHITE_LIST_PLAYER2);
        console.log("balanceOf(WHITE_LIST_PLAYER2): %s", haisenToken.balanceOf(WHITE_LIST_PLAYER2));
        vm.warp(block.timestamp + 4 hours + 1 seconds);
        vm.roll(block.number + 1);
        haisenToken.approve(address(haisenMarket), price);
        //haisenToken.approve(address(this), price);
        console.log("token1Owner: %s", haisenNft.ownerOf(tokenId));
        haisenMarket.buy(tokenId);
        assertEq(haisenMarket.getOrderLength(), 0);
        assertEq(haisenMarket.getAllNFTs().length, 0);
        assertEq(haisenMarket.isListed(tokenId), false);
        assertEq(haisenNft.ownerOf(tokenId), WHITE_LIST_PLAYER2);
        vm.stopPrank();
    }
    ///////////////////////
    ///  CancelOrder    ///
    ///////////////////////

    function testCancelOrder() public NftMinted {
        vm.prank(WHITE_LIST_PLAYER1);
        uint256 tokenId = 1;
        uint256 price = 100;
        string memory tokenUri = haisenNft.tokenURI(tokenId);
        bytes memory data = abi.encode(price, tokenUri);
        vm.prank(WHITE_LIST_PLAYER1);
        haisenNft.safeTransferFrom(WHITE_LIST_PLAYER1, address(haisenMarket), tokenId, data);
        vm.startPrank(WHITE_LIST_PLAYER1);
        haisenMarket.cancelOrder(tokenId);
        assertEq(haisenMarket.getOrderLength(), 0);
        assertEq(haisenMarket.getAllNFTs().length, 0);
        assertEq(haisenMarket.isListed(tokenId), false);
        vm.stopPrank();
    }

    ///////////////////////
    ///  get            ///
    ///////////////////////
    function testGetter() public NftMinted {
        vm.startPrank(WHITE_LIST_PLAYER1);
        uint256 tokenId = 1;
        uint256 price = 100;
        string memory tokenUri = haisenNft.tokenURI(tokenId);
        bytes memory data = abi.encode(price, tokenUri);
        haisenNft.safeTransferFrom(WHITE_LIST_PLAYER1, address(haisenMarket), tokenId, data);
        assertEq(haisenMarket.getOrderLength(), 1);
        assertEq(haisenMarket.getAllNFTs().length, 1);
        assertEq(haisenMarket.isListed(tokenId), true);
        assertEq(haisenMarket.getOrder(tokenId).price, price);
        assertEq(haisenMarket.getMyNFTs().length, 1);
        vm.stopPrank();
    }
}
