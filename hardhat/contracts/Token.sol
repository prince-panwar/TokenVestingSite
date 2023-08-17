// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract token is ERC20 ,Ownable{
    constructor() ERC20("token","TKN"){
        _mint(msg.sender, 1000000*10**decimals());
    }
    function mint(address _to,uint256 _amount)external onlyOwner(){
        _mint(_to,_amount );
    }
}