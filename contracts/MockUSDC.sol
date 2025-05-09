// contracts/test/MockUSDC.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUSDC is ERC20 {
    // Initial supply: 1,000,000 USDC (with 6 decimals)
    uint256 public constant INITIAL_SUPPLY = 1_000_000 * 10 ** 6;

    constructor() ERC20("Mock USDC", "mUSDC") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function decimals() public pure override returns (uint8) {
        return 6;
    }
}
