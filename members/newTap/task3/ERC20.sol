// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import "./IERC20.sol";
import "./Owner.sol";


contract ERC20 is IERC20, Owner {
    // event Transfer(address indexed from, address indexed to, uint256 value);

    // event Approval(
    //     address indexed tokenOwner, address indexed spender, uint256 tokens
    // );
    // 总供应量
    uint256 public totalSupply;
    // 单个账户余额记录
    mapping (address => uint256) public balanceOf;
    // 记录一个账户授权另一个账户中转出一定数量ERC的代币的剩余额度
    mapping (address => mapping (address => uint256)) public allowance;
    string name;
    // 代笔进度,小数点后保留几位小数.作用于代币的展示和交易
    string symbol;
    uint8 decimals;
    // 合约部署初始化基础信息
    constructor(string memory _name, string memory _symbol, uint8 _decimals) Owner(msg.sender){
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
    }

    // 代币的增发
    function _mint(address to, uint256 amount) internal {
        balanceOf[to] += amount;
        totalSupply += amount;
        emit Transfer(address(0), to, amount);
    }
    // 代币的销毁
    function _burn(address from, uint256 amount) internal {
        balanceOf[from] -= amount;
        totalSupply -= amount;
        emit Transfer(from, address(0), amount);
    }

    function mint(address to, uint256 amount) external isOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external isOwner {
        _burn(from, amount);
    }
    

    // 代币的转让
    function transfer(address recipien, uint256 amount)external returns(bool) {
        // 防止转账地址为空
        // 当转账地址为空时,默认会设置为0x0000000000000000000000000000000000000000000000000
        require(recipien != address(0), 'recipien to zero address');
        balanceOf[msg.sender] -= amount;
        balanceOf[recipien] += amount;
        emit Transfer(msg.sender, recipien, amount);
        return true;
    }

    // 调用approve函数后，spender就可以调用transferFrom函数从你的账户中转出代币，直到授权额度用完
    function approve(address spender, uint256 amount) external returns (bool){
        // 防止spender地址为空
        require(spender != address(0), 'spender to zero address');
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    // 授权的三方账户,使主个账户向另一个账户转出一定数量的ERC20代币
    function transferFrom(address sender, address recipien, uint256 amount) external returns (bool){
        require(allowance[sender][msg.sender] >= amount, "Allowance exceeded");
        require(balanceOf[sender] >= amount, "Insufficient balance");
        require(recipien != address(0), "Recipient is zero address");

        allowance[sender][msg.sender] -= amount;
        balanceOf[sender] -= amount;
        balanceOf[recipien] += amount;
        emit Transfer(sender, recipien, amount);
        return true;
    }

}