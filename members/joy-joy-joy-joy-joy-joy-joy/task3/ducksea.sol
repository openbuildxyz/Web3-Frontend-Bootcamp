// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "./bigducktoken.sol";

contract ducksea is IERC721Receiver {
    bigducktoken public paymentToken;
    address public feeRecipient;
    uint256 public constant FEE_PERCENTAGE = 5;
    uint256 public constant REWARD_PROBABILITY = 10;
    uint256 public lastRewardTime;
    uint256 public rewardInterval = 1 hours;
    uint256 public rewardPool;

    event List(
        address indexed seller,
        address indexed nftAddr,
        uint256 indexed tokenId,
        uint256 price
    );
    event Purchase(
        address indexed buyer,
        address indexed nftAddr,
        uint256 indexed tokenId,
        uint256 price
    );
    event Revoke(
        address indexed seller,
        address indexed nftAddr,
        uint256 indexed tokenId
    );
    event Update(
        address indexed seller,
        address indexed nftAddr,
        uint256 indexed tokenId,
        uint256 newPrice
    );
    event RewardGranted(
        address indexed winner,
        uint256 rewardAmount
    );

    struct Order {
        address owner;
        uint256 price;
    }

    mapping(address => mapping(uint256 => Order)) public nftList;

    constructor(address _paymentToken, address _feeRecipient) {
        paymentToken = bigducktoken(_paymentToken);
        feeRecipient = _feeRecipient;
        lastRewardTime = block.timestamp;
    }

    function updateRewardPool() internal {
        if (block.timestamp >= lastRewardTime + rewardInterval) {
            if (rewardPool > 0) {
                paymentToken.burn(rewardPool);
                rewardPool = 0;
            }
            uint256 newTokens = (paymentToken.currentSupply() * 10) / 100;
            paymentToken.mint(address(this),newTokens);
            rewardPool += newTokens;
            lastRewardTime = block.timestamp;
        }
    }

    function random() private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, block.prevrandao))) % 100;
    }

    function randomReward() private view returns (uint256) {
        return (random() % (rewardPool / 2)) + 1;
    }

    function list(address _nftAddr, uint256 _tokenId, uint256 _price) public {
        IERC721 _nft = IERC721(_nftAddr);
        require(_nft.getApproved(_tokenId) == address(this), "Need Approval");
        require(_price > 0, "Price must be greater than zero");

        Order storage _order = nftList[_nftAddr][_tokenId];
        _order.owner = msg.sender;
        _order.price = _price;
        
        _nft.safeTransferFrom(msg.sender, address(this), _tokenId);

        emit List(msg.sender, _nftAddr, _tokenId, _price);
    }

    function purchase(address _nftAddr, uint256 _tokenId) public {
        Order storage _order = nftList[_nftAddr][_tokenId];
        require(_order.price > 0, "Invalid price");

        uint256 fee = (_order.price * FEE_PERCENTAGE) / 100;
        uint256 sellerProceeds = _order.price - fee;
        require(
            paymentToken.allowance(msg.sender, address(this)) >= (_order.price+fee),
            "Token allowance too low"
        );
        require(
            paymentToken.balanceOf(msg.sender) >= (_order.price+fee),
            "Token balance too low"
        );

        IERC721 _nft = IERC721(_nftAddr);
        require(_nft.ownerOf(_tokenId) == address(this), "Invalid order");

        require(
            paymentToken.transferFrom(msg.sender, feeRecipient, fee),
            "Fee transfer failed"
        );

        require(
            paymentToken.transferFrom(msg.sender, _order.owner, sellerProceeds),
            "Seller transfer failed"
        );

        _nft.safeTransferFrom(address(this), msg.sender, _tokenId);

        updateRewardPool();

        if (random() < REWARD_PROBABILITY) {
            uint256 reward = randomReward();
            require(reward <= rewardPool, "Not enough reward in pool");
            rewardPool -= reward;
            paymentToken.transfer(msg.sender, reward);
            emit RewardGranted(msg.sender, reward);
        }

        delete nftList[_nftAddr][_tokenId];

        emit Purchase(msg.sender, _nftAddr, _tokenId, _order.price);
    }

    function revoke(address _nftAddr, uint256 _tokenId) public {
        Order storage _order = nftList[_nftAddr][_tokenId];
        require(_order.owner == msg.sender, "Not owner");

        IERC721 _nft = IERC721(_nftAddr);
        require(_nft.ownerOf(_tokenId) == address(this), "Invalid order");

        _nft.safeTransferFrom(address(this), msg.sender, _tokenId);
        delete nftList[_nftAddr][_tokenId];

        emit Revoke(msg.sender, _nftAddr, _tokenId);
    }

    function update(
        address _nftAddr,
        uint256 _tokenId,
        uint256 _newPrice
    ) public {
        require(_newPrice > 0, "Invalid price");
        Order storage _order = nftList[_nftAddr][_tokenId];
        require(_order.owner == msg.sender, "Not owner");

        IERC721 _nft = IERC721(_nftAddr);
        require(_nft.ownerOf(_tokenId) == address(this), "Invalid order");

        _order.price = _newPrice;

        emit Update(msg.sender, _nftAddr, _tokenId, _newPrice);
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}