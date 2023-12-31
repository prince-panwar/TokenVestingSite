// Sources flattened with hardhat v2.17.1 https://hardhat.org

// SPDX-License-Identifier: MIT

// File @openzeppelin/contracts/utils/Context.sol@v4.9.3

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)

pragma solidity ^0.8.0;

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}


// File @openzeppelin/contracts/access/Ownable.sol@v4.9.3

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v4.9.0) (access/Ownable.sol)

pragma solidity ^0.8.0;

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _transferOwnership(_msgSender());
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby disabling any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}


// File @openzeppelin/contracts/token/ERC20/IERC20.sol@v4.9.3

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v4.9.0) (token/ERC20/IERC20.sol)

pragma solidity ^0.8.0;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `from` to `to` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}


// File contracts/Vesting.sol

// Original license: SPDX_License_Identifier: MIT
pragma solidity ^0.8.19;
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
        organizations[msg.sender].token.approve(address(this),_amount*10**18);
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
