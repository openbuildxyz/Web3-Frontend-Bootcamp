// SPDX-License-Identifier: MIT
//说明协议和solidity版本
pragma solidity ^0.8.20;

//继承，这些东西都可以用npm安装
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract OpenBuildToken is ERC20 {
    //调用父类 ERC20 合约的构造函数，设置代币的名称为 OpenBuildToken，符号为 OBT。
    constructor() ERC20("OpenBuildToken", "OBT") {
        //调用内部的 _mint 函数，向合约部署者（msg.sender）的地址铸造 10000000 * 10 ** 6 个代币。这里的 10 ** 6 表示代币的最小单位，设置了代币的精度为 6 位小数。
        _mint(msg.sender,10000000 * 10 ** 6  );
    }
    // 重写了 ERC20 合约中的 decimals 函数，返回代币的小数位数。
	// •	public：表示这个函数是公开的，任何人都可以调用。
	// •	view：表示这个函数不会修改合约的状态，仅仅是读取数据。
	// •	virtual：表示这个函数可以在继承合约中被重写。
	// •	override：表示这个函数重写了父类中的同名函数。
	// •	returns (uint8)：表示这个函数返回一个 uint8 类型的值。
	// •	return 6;：返回 6，表示代币的精度为 6 位小数。
    function decimals() public view virtual override returns (uint8){
        return 6;
    }
}
