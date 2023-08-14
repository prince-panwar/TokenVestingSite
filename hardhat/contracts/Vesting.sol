// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenVesting is Ownable {
   
   event TokenClaimed(uint256 amount);
   event organizationRegistered(address addr);
   event StakeholderWhiteListed(address addr);
   event VestingScheduleCreated(uint256 stDate, uint256 enDate,uint256 amount);
   event TokensLocked(uint256 amount);

   struct Stakeholder{
    address stakeholderAddress;
     bool isWhitelisted;
     uint256 amount;
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
       VestingSchedule vestingSchedule;
    }

    mapping(address => Organization) public organizations;

   function registerOrganization( IERC20 _token) external  {
    organizations[msg.sender].orgAddress = msg.sender;
    organizations[msg.sender].token = _token;
    emit organizationRegistered(msg.sender);
}
    function lockTokens(uint256 _amount) external {
    require(organizations[msg.sender].orgAddress != address(0), "Organization not registered");
    organizations[msg.sender].token.transferFrom(msg.sender, address(this), _amount*10**18);
    emit TokensLocked(_amount);
    }

    function createVestingSchedule(
        uint256 _startTime,
        uint256 _endTime,
        uint256 _amount
    ) external onlyRegisteredOrg {
      require(_startTime<_endTime,"End date cannot be before the start date");
      require(block.timestamp<_endTime,"End date cannot be before present");
      organizations[msg.sender].vestingSchedule=VestingSchedule(_startTime, _endTime, _amount*10**18);
      emit VestingScheduleCreated(_startTime, _endTime, _amount);
        
    }

    function whiteListStakeholders(address _Stakeholder,uint256 _amount) external onlyRegisteredOrg {
    require(organizations[msg.sender].stakeholder[msg.sender].stakeholderAddress==address(0),"Already Whitlisted");
    require(_Stakeholder!=address(0),"Please enter correct address");
    organizations[msg.sender].stakeholder[_Stakeholder].stakeholderAddress= _Stakeholder;
    organizations[msg.sender].stakeholder[_Stakeholder].isWhitelisted= true;
    organizations[msg.sender].stakeholder[_Stakeholder].amount=_amount*10**18 ;
    emit StakeholderWhiteListed(_Stakeholder);
    }
    function unwhiteListStakeholders(address _Stakeholder) external onlyRegisteredOrg {
    require(_Stakeholder!=address(0),"Please enter correct address");
    organizations[msg.sender].stakeholder[_Stakeholder].stakeholderAddress= _Stakeholder;
    organizations[msg.sender].stakeholder[_Stakeholder].isWhitelisted= false;
    organizations[msg.sender].stakeholder[_Stakeholder].amount=0 ;
    }
    function isWhiteListed(address _stakeholderAddress) external view onlyRegisteredOrg returns (bool){
          require(organizations[msg.sender].stakeholder[_stakeholderAddress].stakeholderAddress!=address(0),"Not a stakeholeder");
          return  organizations[msg.sender].stakeholder[_stakeholderAddress].isWhitelisted;
    }

    function claimTokens(address org) external  {
      require( organizations[org].orgAddress!=address(0),"Not a Registered Organisation");
      require(block.timestamp>=organizations[org].vestingSchedule.startTime,"The Vesting period is not over yet");
      require(block.timestamp<=organizations[org].vestingSchedule.endTime,"The claiming period is over");
      require(organizations[org].stakeholder[msg.sender].stakeholderAddress!=address(0),"You are not white Listed for the claim");
      require(organizations[org].stakeholder[msg.sender].isClaimed!=true,"You have already claimed the amount");
      require(organizations[org].stakeholder[msg.sender].isWhitelisted==true,"You are not white Listed for the claim");
      uint claimAmount = organizations[org].stakeholder[msg.sender].amount; 
      organizations[org].stakeholder[msg.sender].isClaimed=true; 
      organizations[org].token.transfer(msg.sender,claimAmount);
      emit TokenClaimed(claimAmount);
    }

    function getDate() external view  returns (uint256){
        return block.timestamp;
    }
    function getVestingSchedule (address org) external  view returns ( uint256 startTime, uint256 endTime,uint256 amount){
        endTime = organizations[org].vestingSchedule.endTime;
        startTime = organizations[org].vestingSchedule.startTime;
        amount = organizations[org].vestingSchedule.amount;

    }

   
     function isOrganization() external view returns(bool){
        return organizations[msg.sender].orgAddress != address(0);
    }

    modifier onlyRegisteredOrg (){
     require(organizations[msg.sender].orgAddress != address(0), "Organization not registered");
      _;

    }
}


    

