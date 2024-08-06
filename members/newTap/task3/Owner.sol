// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

contract Owner{
    address owner;
    constructor(address ownerAddress){
        owner = ownerAddress;
    }
    
    modifier isOwner (){
        // 校验调用者地址当否是该合约所有者
        require(msg.sender == owner,"not owner");
        _;
    }

    function changeOwner(address _newOwner) external isOwner{
        owner = _newOwner;
    }
}