// SPDX-License-Identifier: MIT
// Layout of Contract:
// version
// imports
// interfaces, libraries, contracts
// errors
// Type declarations
// State variables
// Events
// Modifiers
// Functions

// Layout of Functions:
// constructor
// receive function (if exists)
// fallback function (if exists)
// external
// public
// internal
// private
// view & pure functions
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import {VRFCoordinatorV2Interface} from "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import {VRFConsumerBaseV2} from "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract HaisenNft is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable, VRFConsumerBaseV2 {
    /////////////////
    /// Errors //////
    /////////////////
    error HaisenNft__tokenURI__TokenUriNotFound();
    error HaisenNft__mint__MintingIsNotAllowed();
    error HaisenNft__mint__TokenIdOverflow();
    error HaisenNft__mintWhitelist__InvalidMintCost();
    error HaisenNft__byOwner__OnlyOwner();
    error HaisenNft__burn__OnlyBurnByTokenOwner();
    error HaisenNft__withdraw__BalanceIsZeroWhenWithdrawing();
    error HaisenNft__mintWhitelist__NotInWhitelist();
    error HaisenNft__withdraw__WithdrawFailed();
    error HaisenNft__mintWhitelist__HasMinted();
    error HaisenNft__mintWhitelist__TransferFaild();
    error HaisenNft__mint__NoMoreNft();

    /////////////////////////
    /// State variables /////
    /////////////////////////
    address private immutable i_Owner;
    uint256 private s_TokenCounter;
    //mapping(uint256 tokenId => string tokenUri) private s_tokenIdToUri;
    mapping(address => bool) public s_HasMinted; // Mapping from address to whether it has minted
    // bool to check if minting is allowed, true is allowed, false is not allowed
    bool public s_IsMinting = true;
    string private s_MetadataUri;
    string private s_MetadataUriSuffix;
    bytes32 public s_Root; // MerkleTree root
    //attrubutes for chainlink VRF
    VRFCoordinatorV2Interface COORDINATOR;
    uint64 immutable i_SubscriptionId;
    uint256 immutable i_MintMaxTotal;
    address immutable i_VrfCoordinator;
    bytes32 immutable i_KeyHash;
    uint32 constant CALLBACKGASLIMIT = 2500000;
    uint16 constant REQUESTCONFIRMATIONS = 3;
    uint32 constant NUMWORDS = 1;
    mapping(uint256 => uint256) public s_RequestIdToTokenId;
    uint256[] public s_Numbers;
    uint256 public s_RemainingNumbers;

    /////////////////////////
    ///     Event         ///
    /////////////////////////
    event HaisenNft_NftMinted(address indexed player, uint256 indexed tokenId, uint256 requestId);
    event HaisenNft_NftBurned(address indexed player, uint256 indexed tokenId);
    event HaisenNft_Withdraw();
    event HaisenNft_tokenIdtoTokenURI(uint256 indexed tokenId, uint256 metadateIndex);

    /////////////////////////
    ///     Functions     ///
    /////////////////////////
    constructor(
        bytes32 merkleroot,
        string memory metadataUri,
        address initialOwner,
        uint64 subscriptionId,
        uint256 mintMaxTotal,
        address vrfCoordinator,
        bytes32 keyHash
    ) ERC721("HaisenNft", "HNFT") Ownable(initialOwner) VRFConsumerBaseV2(vrfCoordinator) {
        i_VrfCoordinator = vrfCoordinator;
        i_KeyHash = keyHash;
        i_Owner = initialOwner;
        i_MintMaxTotal = mintMaxTotal;
        // start tokenIds at 1, its more gas efficient
        s_TokenCounter++;
        s_MetadataUri = metadataUri;
        s_Root = merkleroot;
        COORDINATOR = VRFCoordinatorV2Interface(i_VrfCoordinator);
        i_SubscriptionId = subscriptionId;
        initializeNumbers(i_MintMaxTotal);
    }

    /////////////////////////
    ///     External      ///
    /////////////////////////

    function mintWhiteList(address player, bytes32[] memory proof) external {
        if (s_HasMinted[player]) {
            revert HaisenNft__mintWhitelist__HasMinted();
        }

        if (!isWhitelist(proof, keccak256(abi.encodePacked(player)))) {
            revert HaisenNft__mintWhitelist__NotInWhitelist();
        }
        _mint(player);
        s_HasMinted[player] = true;
    }

    /////////////////////////
    ///     Public        ///
    /////////////////////////
    function getMetadataUri() public view returns (string memory) {
        return s_MetadataUri;
    }

    function getOwner() public view returns (address) {
        return i_Owner;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_TokenCounter;
    }

    //openzeppelin ERC721URIStorage
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        if (ownerOf(tokenId) == address(0)) {
            revert HaisenNft__tokenURI__TokenUriNotFound();
        }
        return super.tokenURI(tokenId);
    }

    //openzeppelin ERC721Enumerable
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /////////////////////////
    ///  Public onlyOwner ///
    /////////////////////////
    function withdraw() external payable onlyOwner {
        if (address(this).balance == 0) {
            revert HaisenNft__withdraw__BalanceIsZeroWhenWithdrawing();
        }
        (bool sussess,) = payable(msg.sender).call{value: address(this).balance}("");
        if (!sussess) {
            revert HaisenNft__withdraw__WithdrawFailed();
        }
        emit HaisenNft_Withdraw();
    }

    function setMetadataUri(string memory uri) public onlyOwner {
        s_MetadataUri = uri;
    }

    function setRoot(bytes32 newRoot) public onlyOwner {
        s_Root = newRoot;
    }

    function setIsMinting(bool isMinting) public onlyOwner {
        s_IsMinting = isMinting;
    }

    /**
     * Only allow the owner of the token to burn it
     */
    function burn(uint256 tokenId) public {
        if (msg.sender != ownerOf(tokenId)) {
            revert HaisenNft__burn__OnlyBurnByTokenOwner();
        }
        emit HaisenNft_NftBurned(msg.sender, tokenId);
        super._burn(tokenId);
    }

    /////////////////////////
    ///     Internal      ///
    /////////////////////////
    function getTokenURI(uint256 index) internal view returns (string memory) {
        string memory IndexString = Strings.toString(index);
        string memory tokenURI1 = string(abi.encodePacked(s_MetadataUri, IndexString, s_MetadataUriSuffix));

        return tokenURI1;
    }

    //openzeppelin ERC721Enumerable
    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    //openzeppelin ERC721Enumerable
    function _increaseBalance(address account, uint128 value) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    //overriding VRFConsumerBaseV2
    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {
        uint256 s_tokenId = s_RequestIdToTokenId[requestId];
        uint256 randomNumber = processRandomNumber(randomWords[0]);

        string memory tokenURI1 = getTokenURI(randomNumber);
        // link the tokenId with the metadata's address
        _setTokenURI(s_tokenId, tokenURI1);
        s_IsMinting = true;
        emit HaisenNft_tokenIdtoTokenURI(s_tokenId, randomNumber);
    }

    /**
     * @dev Initialize the numbers array with nftNum numbers
     * @param nftNum the number of nft to be minted
     */
    function initializeNumbers(uint256 nftNum) internal {
        for (uint256 i = 0; i < nftNum; i++) {
            s_Numbers.push(i);
        }
        s_RemainingNumbers = s_Numbers.length;
    }

    function processRandomNumber(uint256 rawRandomNum) internal returns (uint256) {
        if (s_RemainingNumbers <= 0) {
            revert HaisenNft__mint__NoMoreNft();
        }
        if (s_RemainingNumbers == 1) {
            return s_Numbers[0];
        }
        uint256 randomIndex = rawRandomNum % s_RemainingNumbers;
        uint256 selectedNumber = s_Numbers[randomIndex];

        // put the last element in the place of the selected element
        s_Numbers[randomIndex] = s_Numbers[s_RemainingNumbers - 1];

        //delete the last element
        s_Numbers.pop();
        s_RemainingNumbers--;

        return selectedNumber;
    }

    /////////////////////////
    ///     Private       ///
    /////////////////////////
    /**
     * basic mint function
     * @param player address of the player
     * @dev The minting of an NFT is actually about linking a user's address with the NFT's tokenId, and then linking the tokenId with the metadata's address, which is the tokenURI.
     */
    function _mint(address player) private {
        if (s_IsMinting == false) {
            revert HaisenNft__mint__MintingIsNotAllowed();
        }
        if (s_RemainingNumbers <= 0) {
            revert HaisenNft__mint__NoMoreNft();
        }
        uint256 s_tokenId = s_TokenCounter;
        if (s_tokenId > i_MintMaxTotal) {
            revert HaisenNft__mint__TokenIdOverflow();
        }
        // link the user's address with the tokenId
        _safeMint(player, s_tokenId);
        // get a random index, its between 0 and nftNums,and its not repeated
        uint256 requestId = COORDINATOR.requestRandomWords(
            i_KeyHash, i_SubscriptionId, REQUESTCONFIRMATIONS, CALLBACKGASLIMIT, NUMWORDS
        );
        s_IsMinting = false; // wait for the random number to be generated
        s_RequestIdToTokenId[requestId] = s_tokenId;
        s_TokenCounter++;
        emit HaisenNft_NftMinted(player, s_tokenId, requestId);
    }

    function isWhitelist(bytes32[] memory proof, bytes32 leaf) private view returns (bool) {
        return MerkleProof.verify(proof, s_Root, leaf);
    }
}
