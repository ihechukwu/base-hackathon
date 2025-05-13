// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract GiftCardRedeemer is
    Initializable,
    UUPSUpgradeable,
    OwnableUpgradeable,
    PausableUpgradeable,
    ReentrancyGuardUpgradeable
{
    using SafeERC20 for IERC20;

    // Events (must be declared before usage)
    event UserRegistered(address indexed user);
    event FundsClaimed(address indexed user, uint256 amount);
    event EmergencyWithdraw(address indexed token, uint256 amount);
    event Initialized(address indexed usdcToken);

    // Errors
    error AlreadyRegistered();
    error NotRegistered();
    error ZeroAmount();
    error InsufficientContractBalance();
    error TransferFailed();
    error AlreadyInitialized();

    // Constants
    uint256 public constant MIN_AMOUNT = 1 * 10 ** 6; // 1 USDC (6 decimals)

    // State variables
    IERC20 public usdcToken;
    mapping(address => bool) public registeredUsers;
    address[] public allUsers;
    uint256 public totalDistributed;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address _usdcToken) public initializer {
        __Ownable_init(msg.sender);
        __Pausable_init();
        __ReentrancyGuard_init();
        __UUPSUpgradeable_init();

        if (address(usdcToken) != address(0)) revert AlreadyInitialized();
        require(_usdcToken != address(0), "Zero token address");

        usdcToken = IERC20(_usdcToken);
        emit Initialized(_usdcToken);
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    /**
     * @notice Register user's wallet address
     * @dev Can only register once per address
     */
    function register() external whenNotPaused {
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
    function claimTokens(uint256 amount) external nonReentrant whenNotPaused {
        _validateClaim(amount);
        totalDistributed += amount;

        usdcToken.safeTransfer(msg.sender, amount);
        emit FundsClaimed(msg.sender, amount);
    }

    /**
     * @dev Internal validation for claims
     */
    function _validateClaim(uint256 amount) private view {
        if (!registeredUsers[msg.sender]) revert NotRegistered();
        if (amount < MIN_AMOUNT) revert ZeroAmount();
        if (usdcToken.balanceOf(address(this)) < amount) {
            revert InsufficientContractBalance();
        }
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
    function contractBalance() external view returns (uint256) {
        return usdcToken.balanceOf(address(this));
    }

    /**
     * @notice Pause contract functionality
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @notice Unpause contract functionality
     */
    function unpause() external onlyOwner {
        _unpause();
    }
}
