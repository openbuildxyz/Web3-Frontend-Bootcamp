// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import "./IERC721.sol";

contract ERC721 is IERC721 {

      event Transfer(
        address indexed from, address indexed to, uint256 indexed id
    );
    event Approval(
        address indexed owner, address indexed spender, uint256 indexed id
    );
    event ApprovalForAll(
        address indexed owner, address indexed operator, bool approved
    );

    uint256 public  _nextTokenId;

    struct NFTDEtails {
        address owner;
        string tokenUrl;
        uint256 timestamp;
    }
    
    // nft ID 映射的所有者账户
    mapping (uint256 => NFTDEtails) internal _ownerOf;
    // 记录账户nft的总数
    mapping (address => uint256) internal _balanceOf;
    // 记录单个nft的操作授权
    mapping (uint256 => address) internal _approvals;
    // 记录当前用户下所有ntf的操作授权
    mapping (address => mapping (address => bool)) public isApprovedForAll;

    // 检查合约是否是IERC721或IERC165
    function supportsInterface(bytes4 interfaceId)
        external
        pure
        returns (bool)
    {
        return interfaceId == type(IERC721).interfaceId
            || interfaceId == type(IERC165).interfaceId;
    }

    // 查询nft所属账户
    function ownerOf(uint256 id) external view returns(address){
        address owner = _ownerOf[id].owner;
        require(owner != address(0), "token doesn't exist");
        return owner;
    }

    function getTokenUrl(uint256 id) external view returns (string memory){
        string memory tokenUrl = _ownerOf[id].tokenUrl;
        return tokenUrl;
    }

    // 查询账户所持有nft总数
    function balanceOf(address owner) external view returns(uint256) {
        require(owner != address(0), "owner = zero address");
        return _balanceOf[owner];
    }

    // 授权三方账户,可以对当前账户的操作
    function setApprovalForAll(address operator, bool approved) external{
        isApprovedForAll[msg.sender][operator] = approved;
         emit ApprovalForAll(msg.sender, operator, approved);
    }

    // 授权第三方用户对合约的操作
    function approve(address spender, uint256 id) external {
        address owner = _ownerOf[id].owner;
        require(msg.sender == owner || isApprovedForAll[owner][msg.sender],"not authoried");
        _approvals[id] = spender;

         emit Approval(owner, spender, id);
    }

    // 查询nft所有者?
    function getApproved(uint256 id) external view returns (address){
        require(_ownerOf[id].owner != address(0), "token doesn't exist");
        return _ownerOf[id].owner;
    }

    // 确保当前nft可被操作
    function _isApprovedOrOwner(address owner, address spender, uint256 id) internal  view returns(bool){
        return (
            spender == owner || isApprovedForAll[owner][spender] || spender == _approvals[id]
        );
    }

    // 转让nft
    function transferFrom(address from, address to, uint256 id) public  {
        require(to != address(0), "transfer to zero address");
        // 只能转所持有的nft
        require(from == _ownerOf[id].owner, "from != owner");
        // 确保有权钱对nft的操作
        require(_isApprovedOrOwner(from, msg.sender, id), "not authorized");

        // 更改钱包的nft计数,以及ntf的所有者地址
        _balanceOf[from]--;
        _balanceOf[to]++;
        _ownerOf[id].owner = to;

        // 删除nft对三方账户的授权
        delete _approvals[id];

         emit Transfer(from, to, id);
    }

    // 更为安全的转账方式???
    function safeTransferFrom(address from, address to, uint256 id) external {
        transferFrom(from, to, id);
        require(
            to.code.length == 0
                || IERC721Receiver(to).onERC721Received(msg.sender, from, id, "")
                    == IERC721Receiver.onERC721Received.selector,
            "unsafe recipient"
        );
    }

    // 更为安全的转账方式???
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        bytes calldata data
    ) external {
        transferFrom(from, to, id);

        require(
            to.code.length == 0
                || IERC721Receiver(to).onERC721Received(msg.sender, from, id, data)
                    == IERC721Receiver.onERC721Received.selector,
            "unsafe recipient"
        );
    }

    function mint (address to, string memory tokenUrl) public {
        _nextTokenId++;
        _mint(to, _nextTokenId, tokenUrl);
    }

    // 创建呢nft
    function _mint(address to, uint256 id, string memory tokenUrl) internal {
        // mint的地址为空
        // 当地址为空时,默认会设置为0x0000000000000000000000000000000000000000000000000
        require(to != address(0), "mint to zero address");
        require(_ownerOf[id].owner == address(0),"alerady minted");
        // 当前账户的nft数量加一
        _balanceOf[to]++;
        // 记录当前nft的所有者
        _ownerOf[id].owner = to;
        _ownerOf[id].tokenUrl = tokenUrl;
        _ownerOf[id].timestamp = block.timestamp;

        emit Transfer(address(0), to, id);
        
    }

    function _burn(uint256 id) internal {
        address owner = _ownerOf[id].owner;
        require(owner != address(0), "not minted");
        // 当前账户的nft数量减一
        _balanceOf[owner] -= 1;

        // 删除当前nft的信息
        delete _ownerOf[id];
        delete _approvals[id];

         emit Transfer(owner, address(0), id);
    }
}