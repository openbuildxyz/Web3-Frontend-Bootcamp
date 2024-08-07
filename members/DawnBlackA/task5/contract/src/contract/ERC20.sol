// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.10;

import "src/interface/IERC20.sol";
import "forge-std/console.sol";

contract ERC20 is IERC20 {

    mapping(address => uint256) public override balanceOf;

    mapping(address => mapping(address => uint256)) public override allowance;

    mapping (address => bool) admin;

    uint256 public override totalSupply;

    string public name;
    string public symbol;
    
    uint8 public decimals = 18;

    address private owner;
    // address private admin;

    constructor(string memory _name,string memory _symbol) {
        name = _name;
        _symbol = symbol;
        owner = msg.sender;
        admin[msg.sender] = true;
        _mint(msg.sender,21000000*10**18);
    }

    function setAdmin(address _admin) external {
        require(msg.sender == owner,"contract:::ERC20.sol::ERC20:You must be owner.");
        // admin = _admin;
        admin[_admin] = true;
    }

    modifier adminOnly {
        require(admin[msg.sender],"contract:::ERC20.sol::ERC20:You must be admin.");
        _;
    }

    function transfer(address to,uint256 amount)  public override returns (bool) {
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;

        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function approve(address spender,uint256 amount) public override returns (bool) {
        console.log(spender);
        allowance[msg.sender][spender] = amount;
        emit Approval(owner, spender, amount);
        return true;
    }

    function transferFrom(address from,address to,uint256 amount) public override returns (bool) {
        allowance[from][msg.sender] -= amount;
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        emit Transfer(from, to, amount);
        return true;
    }

    function _mint(address account,uint256 amount) internal {
        balanceOf[account] += amount;
        totalSupply += amount;
        emit Transfer(address(0), account, amount);
    }

    function mint(uint256 amount) external {
        _mint(msg.sender, amount);
    }

    function _burn(address account,uint amount) internal {
        balanceOf[account] -= amount;
        totalSupply -= amount;
        emit Transfer(account, address(0), amount); 
    }

    function burn(uint amount) external adminOnly() {
        _burn(msg.sender, amount);
    }

    // function request() external adminOnly(){
    //     balanceOf[address(this)] -= 1000;
    //     balanceOf[msg.sender] += 1000;
    //     emit Transfer(address(this), msg.sender, 1000);
    // }

}