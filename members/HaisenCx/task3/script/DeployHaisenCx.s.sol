// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {HaisenNft} from "../src/HaisenNft.sol";
import {CreateSubscription, FundSubscription, AddConsumer} from "./Interactions.s.sol";
import {HaisenToken} from "../src/HaisenToken.sol";
import {HaisenNftMarket} from "../src/HaisenNftMarket.sol";

contract DeployHaisenCx is Script {
    struct DeployReturns {
        HelperConfig helperConfig;
        HaisenNft haisenNft;
        HaisenToken haisenToken;
        HaisenNftMarket haisenNftMarket;
    }

    bytes32 public merkleroot = 0xd90453cde78c9d8a6e8051b165d5819c9b4339537baf931919489c0e948fb9f3;
    string public metadataUri =
        "https://white-left-chameleon-515.mypinata.cloud/ipfs/QmThBYjgDMGxwFnxxWH6WpQT8rM2RjphcXSvJcQWgRnJfF/";
    uint256 public mintMaxTotal = 100;
    uint256 public constant INITIAL_SUPPLY = 1_000_000 ether; // 1 million tokens with 18 decimal places
    uint256 public DEFAULT_ANVIL_PRIVATE_KEY = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
    uint256 public depolyAddress;

    function run() external returns (DeployReturns memory deployReturns) {
        HelperConfig helperConfig = new HelperConfig();
        AddConsumer addConsumer = new AddConsumer();

        (address vrfCoordinatorV2, bytes32 gasLane, uint64 subscriptionId, address link, uint256 deployerKey) =
            helperConfig.activeNetworkConfig();
        depolyAddress = deployerKey;
        if (subscriptionId == 0) {
            CreateSubscription createSubscription = new CreateSubscription();
            (subscriptionId, vrfCoordinatorV2) = createSubscription.createSubscription(vrfCoordinatorV2, deployerKey);

            FundSubscription fundSubscription = new FundSubscription();
            fundSubscription.fundSubscription(vrfCoordinatorV2, subscriptionId, link, deployerKey);
        }
        vm.startBroadcast(deployerKey);
        HaisenNft haisenNft =
            new HaisenNft(merkleroot, metadataUri, msg.sender, subscriptionId, mintMaxTotal, vrfCoordinatorV2, gasLane);
        HaisenToken haisenToken = new HaisenToken(INITIAL_SUPPLY);
        HaisenNftMarket haisenNftMarket = new HaisenNftMarket(address(haisenToken), address(haisenNft));
        vm.stopBroadcast();

        addConsumer.addConsumer(address(haisenNft), vrfCoordinatorV2, subscriptionId, deployerKey);
        deployReturns = DeployReturns(helperConfig, haisenNft, haisenToken, haisenNftMarket);
        return deployReturns;
    }
}
