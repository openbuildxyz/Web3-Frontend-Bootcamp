// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract ERC721Token {
    string public name;
    string public symbol;
    uint256 public totalSupply;

    mapping(uint256 => address) public ownerOf;
    mapping(address => uint256[]) public ownedTokens;
    mapping(uint256 => address) public approved;
    mapping(address => mapping(address => bool)) public operatorApprovals;

    event Transfer(address indexed from, address indexed to, uint256 tokenId);
    event Approval(
        address indexed owner,
        address indexed approved,
        uint256 tokenId
    );

    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
    }

    function mint(address _to, uint256 _tokenId) external {
        require(ownerOf[_tokenId] == address(0), "Token already exists");
        ownerOf[_tokenId] = _to;
        ownedTokens[_to].push(_tokenId);
        totalSupply++;
        emit Transfer(address(0), _to, _tokenId);
    }

    function approve(address _to, uint256 _tokenId) external {
        require(msg.sender == ownerOf[_tokenId], "Not token owner");
        approved[_tokenId] = _to;
        emit Approval(msg.sender, _to, _tokenId);
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) external {
        require(ownerOf[_tokenId] == _from, "Not token owner");
        require(
            msg.sender == _from ||
                msg.sender == approved[_tokenId] ||
                operatorApprovals[_from][msg.sender],
            "Not approved"
        );
        ownerOf[_tokenId] = _to;
        // Update owner's token list
        uint256[] storage fromTokens = ownedTokens[_from];
        for (uint256 i = 0; i < fromTokens.length; i++) {
            if (fromTokens[i] == _tokenId) {
                fromTokens[i] = fromTokens[fromTokens.length - 1];
                fromTokens.pop();
                break;
            }
        }
        ownedTokens[_to].push(_tokenId);

        emit Transfer(_from, _to, _tokenId);
    }

    function setApprovalForAll(address _operator, bool _approved) external {
        operatorApprovals[msg.sender][_operator] = _approved;
    }
}

// 0x6F817c5d3ccd451fd38B4cB77E78d85FD1F0810d
// localhost: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
