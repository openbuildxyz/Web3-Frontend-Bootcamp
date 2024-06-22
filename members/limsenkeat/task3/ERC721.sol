// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MomBirds is ERC721, Ownable {
    
    uint256 public constant MAX_SUPPLY = 10000;
    uint256 public totalMinted = 0;
    mapping(uint256 => bool) private _mintedTokens;
    mapping(address => uint256) public mintCount;
    uint256 public constant MAX_MINT_PER_ADDRESS = 10;

    event Minted(address indexed to, uint256 indexed tokenId);

    constructor() ERC721("MomBirds", "MBR") Ownable(msg.sender) {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://storage.googleapis.com/nftimagebucket/tokens/0x23581767a106ae21c074b2276d25e5c3e136a68b/preview/";
    }

    function mint(address to) external returns (uint256) {
        require(totalMinted < MAX_SUPPLY, "Sold out");
        require(mintCount[msg.sender] < MAX_MINT_PER_ADDRESS, "Exceeded max mint per address");
        
        uint256 newTokenId = generateUniqueRandomId();
        _safeMint(to, newTokenId);
        totalMinted++;
        mintCount[msg.sender]++;
        
        emit Minted(to, newTokenId);
        return newTokenId;
    }

    function generateUniqueRandomId() internal returns (uint256) {
        uint256 randomId;
        bool unique = false;

        while (!unique) {
            randomId = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, totalMinted))) % MAX_SUPPLY;
            if (!_mintedTokens[randomId]) {
                _mintedTokens[randomId] = true;
                unique = true;
            }
        }

        return randomId;
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner()).transfer(balance);
    }
    
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Invalid token.");
        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, _toString(tokenId), ".png")) : "";
    }

    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}