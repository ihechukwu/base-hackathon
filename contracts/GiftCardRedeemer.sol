// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/pausable.sol";

/**
 * @title USDC Gift Card Redeemer
 * @notice Allows users to register and claim USDC tokens
 * @dev Uses SafeERC20 for secure transfers, ReentrancyGuard for protection
 */
contract GiftCardRedeemer is ReentrancyGuard, ownable, pausable{
    using SafeERC20 for IERC20;

    IERC20 public immutable usdcToken;
    uint256 public constant MIN_AMOUNT = 1 * 10 ** 6; // 1 USDC (6 decimals)

    mapping(address => bool) public registeredUsers;
    address[] public allUsers;
    uint256 public totalDistributed;

    event UserRegistered(address indexed user);
    event FundsClaimed(address indexed user, uint256 amount);
    event EmergencyWithdraw(address indexed token, uint256 amount);

    error AlreadyRegistered();
    error ZeroAmount();
    error InsufficientContractBalance();
    error TransferFailed();

    constructor(address _usdcToken) {
        require(_usdcToken != address(0), "Zero token address");
        usdcToken = IERC20(_usdcToken);
    }

    /**
     * @notice Register user's wallet address
     * @dev Can only register once per address
     */
    function register() external whenNotPaused{
        if (registeredUsers[msg.sender]) revert AlreadyRegistered();

        registeredUsers[msg.sender] = true;
        allUsers.push(msg.sender);

        emit UserRegistered(msg.sender);
    }

    /**
     * @notice Claim USDC tokens
     * @param amount Amount to claim (in USDC decimals)
     * @dev Non-reentrant, requires registration
     */
    function claimTokens(uint256 amount) external nonReentrant whenNotPaused{
        if (!registeredUsers[msg.sender]) revert("Not registered");
        if (amount < MIN_AMOUNT) revert ZeroAmount();
        if (usdcToken.balanceOf(address(this)) < amount)

            revert InsufficientContractBalance();

        totalDistributed += amount;

        bool success = usdcToken.transfer(msg.sender, amount);
        if (!success) revert TransferFailed();

        emit FundsClaimed(msg.sender, amount);
    }

    function _validateClaim(uint amount) private view {
        if(!registeredUsers[msg.sender]) revert ("Not registered");
        if (amount <MIN_AMOUNT) revert ZeroAmount();
    }

    /**
     * @notice Get total registered users
     */
    function totalUsers() external view returns (uint256) {
        return allUsers.length;
    }

    /**
     * @notice Emergency withdraw tokens (owner only)
     * @param token Token address to withdraw
     * @param amount Amount to withdraw
     */
    function emergencyWithdraw(
        address token,
        uint256 amount
    ) external onlyOwner {
        IERC20(token).safeTransfer(owner(), amount);
        emit EmergencyWithdraw(token, amount);
    }

    /**
     * @notice Check contract's USDC balance
     */
    function contractBalance() external view returns (uint256) onlyOwner{
        return usdcToken.balanceOf(address(this));
    }
}
