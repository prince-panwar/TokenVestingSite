// SPDX-License-Identifier: MIT


pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract TokenVesting is Ownable , ReentrancyGuard{
   
struct Stakeholder{
    address stakeholderAddress;
    VestingSchedule vestingSchedule;
    bool isWhitelisted;
    bool isClaimed;

   }
    struct VestingSchedule {
        uint256 startTime;
        uint256 endTime;
        uint256 amount;
    }

    struct Organization {
        address orgAddress;
        IERC20 token;
        mapping(address => Stakeholder) stakeholder;
       
    }

    mapping(address => Organization) public organizations;

   function registerOrganization( IERC20 _token) external  {
    organizations[msg.sender].orgAddress = msg.sender;
    organizations[msg.sender].token = _token;

}
    function lockTokens(uint256 _amount) external {
    require(organizations[msg.sender].orgAddress != address(0), "Organization not registered");
    require(organizations[msg.sender].token.approve(address(this),_amount),"Amount not approved");
    organizations[msg.sender].token.transferFrom(msg.sender, address(this), _amount*10**18);
    
    }


    function whiteListStakeholders(
        address _Stakeholder,
        uint256 _amount,
        uint256 _startTime,
        uint256 _endTime
    ) external onlyRegisteredOrg {
    require(_startTime<_endTime,"End date cannot be before the start date");
    require(block.timestamp<_endTime,"End date cannot be before present");
    require(organizations[msg.sender].stakeholder[msg.sender].stakeholderAddress==address(0),"Already Whitlisted");
    require(_Stakeholder!=address(0),"Please enter correct address");
    organizations[msg.sender].stakeholder[_Stakeholder].stakeholderAddress= _Stakeholder;
    organizations[msg.sender].stakeholder[_Stakeholder].vestingSchedule=VestingSchedule(_startTime, _endTime, _amount*10**18);
    organizations[msg.sender].stakeholder[_Stakeholder].isWhitelisted= true;
    }


    function unwhiteListStakeholders(address _Stakeholder) external onlyRegisteredOrg {
    require(_Stakeholder!=address(0),"Please enter correct address");
    organizations[msg.sender].stakeholder[_Stakeholder].isWhitelisted= false;
    
    }
    function isWhiteListed(address _stakeholderAddress) external view onlyRegisteredOrg returns (bool){
          require(organizations[msg.sender].stakeholder[_stakeholderAddress].stakeholderAddress!=address(0),"Not a stakeholeder");
          return  organizations[msg.sender].stakeholder[_stakeholderAddress].isWhitelisted;
    }

    function claimTokens(address org) external  {
      require( organizations[org].orgAddress!=address(0),"Not a Registered Organisation");
      require(block.timestamp>=organizations[org].stakeholder[msg.sender].vestingSchedule.startTime,"Vesting period not started yet");
      require(block.timestamp<=organizations[org].stakeholder[msg.sender].vestingSchedule.endTime,"The claiming period is over");
      require(organizations[org].stakeholder[msg.sender].stakeholderAddress!=address(0),"You are not white Listed for the claim");
      require(organizations[org].stakeholder[msg.sender].isClaimed!=true,"You have already claimed the amount");
      require(organizations[org].stakeholder[msg.sender].isWhitelisted==true,"You are not white Listed for the claim");
      uint claimAmount = organizations[org].stakeholder[msg.sender].vestingSchedule.amount; 
      organizations[org].stakeholder[msg.sender].isClaimed=true; 
      organizations[org].token.transfer(msg.sender,claimAmount);
     
    }

    function getDate() external view  returns (uint256){
        return block.timestamp;                                                                
    }
    function getVestingSchedule (address _Stakeholder) external  view returns ( uint256 startTime, uint256 endTime,uint256 amount){
        endTime = organizations[msg.sender].stakeholder[_Stakeholder].vestingSchedule.endTime;
        startTime = organizations[msg.sender].stakeholder[_Stakeholder].vestingSchedule.startTime;
        amount = organizations[msg.sender].stakeholder[_Stakeholder].vestingSchedule.amount;

    }

   
     function isOrganization() external view returns(bool){
        return organizations[msg.sender].orgAddress != address(0);
    }
    function getToken() external  view onlyRegisteredOrg returns (uint256){
        return organizations[msg.sender].token.balanceOf(address(this));
    }
      function getTokenAddress() external view  onlyRegisteredOrg returns (IERC20){
        return organizations[msg.sender].token;
    }

    modifier onlyRegisteredOrg (){
     require(organizations[msg.sender].orgAddress != address(0), "Organization not registered");
      _;

    }
}

    

