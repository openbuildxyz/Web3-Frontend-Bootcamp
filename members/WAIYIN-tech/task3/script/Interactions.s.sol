// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {Market} from "../src/Market.sol";
import {DeployNftExchangeToken} from "./DeployNftExchangeToken.s.sol";
import {NftExchangeToken} from "../src/NftExchangeToken.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";
import {DevOpsTools} from "lib/foundry-devops/src/DevOpsTools.sol";
import {WNft} from "../src/WNft.sol";

contract MintToken is Script {
    function run() external {
        mintToken(vm.envAddress("TARGET_ADDRESS"), vm.envUint("AMOUNT"));
    }

    function mintToken(address user, uint256 amount) internal {
        address contractAddr = DevOpsTools.get_most_recent_deployment("NftExchangeToken", block.chainid);
        vm.startBroadcast();
        NftExchangeToken(contractAddr).mint(user, amount);
        vm.stopBroadcast();
    }
}

contract ApproveToken is Script {
    function run() external {
        approveToken(vm.envAddress("TARGET_ADDRESS"), vm.envUint("AMOUNT"));
    }

    function approveToken(address target, uint256 amount) internal {
        address contractAddr = DevOpsTools.get_most_recent_deployment("NftExchangeToken", block.chainid);
        vm.startBroadcast();
        NftExchangeToken(contractAddr).approve(target, amount);
        vm.stopBroadcast();
    }
}

contract RegisterNftSeller is Script {
    function run() external {
        address contractAddress = DevOpsTools.get_most_recent_deployment("WNft", block.chainid);
        WNft nft = WNft(contractAddress);
        address user = vm.envAddress("TARGET_ADDRESS");
        vm.startBroadcast();
        nft.register(user);
        vm.stopBroadcast();
    }
}

contract MintNFT is Script {
    string public constant TEST_JSON_URI = '{"name": "abc"}';

    function run() external {
        uint256 tokenId = mintNFT(jsonToURI(TEST_JSON_URI));
        console.log("MintNFT: ", tokenId);
        approveNFT(vm.envAddress("TARGET_ADDRESS"), tokenId);
    }

    function mintNFT(string memory uri) internal returns (uint256) {
        address contractAddress = DevOpsTools.get_most_recent_deployment("WNft", block.chainid);
        WNft nft = WNft(contractAddress);
        vm.startBroadcast();
        uint256 tokenId = nft.safeMint(uri);
        vm.stopBroadcast();

        return tokenId;
    }

    function jsonToURI(string memory json) public pure returns (string memory) {
        string memory baseUrl = "data:application/json;base64,";
        string memory svgBase64Encoded = Base64.encode(bytes(string(abi.encodePacked(json))));
        return string(abi.encodePacked(baseUrl, svgBase64Encoded));
    }

    function approveNFT(address target, uint256 tokenId) internal {
        address contractAddress = DevOpsTools.get_most_recent_deployment("WNft", block.chainid);
        WNft nft = WNft(contractAddress);
        vm.startBroadcast();
        nft.approve(target, tokenId);
        vm.stopBroadcast();
    }
}

// 上架
contract Launch is Script {
    function run() external {
        launch(vm.envUint("TOKEN_ID"), vm.envUint("PRICE"));
    }

    function launch(uint256 tokenId, uint256 price) internal {
        address contractAddress = DevOpsTools.get_most_recent_deployment("Market", block.chainid);
        address nftAddress = DevOpsTools.get_most_recent_deployment("WNft", block.chainid);
        Market market = Market(contractAddress);

        vm.startBroadcast();
        market.launch(nftAddress, tokenId, price);
        vm.stopBroadcast();
    }
}

// 交易
contract Buy is Script {
    function run() external {
        buy(vm.envUint("TOKEN_ID"));
    }

    function buy(uint256 tokenId) internal {
        address contractAddress = DevOpsTools.get_most_recent_deployment("Market", block.chainid);
        address nftAddress = DevOpsTools.get_most_recent_deployment("WNft", block.chainid);
        Market market = Market(contractAddress);

        vm.startBroadcast();
        market.buy(nftAddress, tokenId);
        vm.stopBroadcast();
    }
}
