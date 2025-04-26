// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract GiftCardRedeemer {
    // address of the owenr of contract
    error GiftCardRedeemer__zeroBalance();
    error GiftCardRedeemer__insufficientFunds();
    error GiftCardRedeemer__userAlreadyExists();
    error GiftCardRedeemer__notOwner();
    error GiftCardRedeemer__pausedWithdrawal();
    address public owner;
    bool private pause;

    // a User type to hold the amount an d also the registration status of each user
    struct User {
        bool exists;
        uint balance;
    }

    // each address is associated with an amount and also registration status
    mapping(address => User) public users;
    address[] public userList;
    event UserRegistered(address indexed user);
    modifier onlyRegistered() {
        require(users[msg.sender].exists, "register first");
        _;
    }
    modifier isPaused() {
        if (pause) {
            revert GiftCardRedeemer__pausedWithdrawal();
        }
        _;
    }
    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert GiftCardRedeemer__notOwner();
        }
        _;
    }

    // deployer of contract owns the contract
    constructor() {
        owner = msg.sender;
        pause = false;
    }

    function register() external {
        require(!users[msg.sender].exists, "user exists");

        users[msg.sender] = User({exists: true, balance: 0});
        userList.push(msg.sender);
        emit UserRegistered(msg.sender);
    }

    function redeem(uint _amount) external onlyRegistered {
        if (_amount <= 0) {
            revert GiftCardRedeemer__zeroBalance();
        }
        users[msg.sender].balance += _amount;
    }

    function withdraw() external onlyRegistered isPaused {
        if (users[msg.sender].balance == 0) {
            revert GiftCardRedeemer__insufficientFunds();
        }
        uint amount = users[msg.sender].balance;
        users[msg.sender].balance = 0;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Ether transfer failed");
    }

    function pauseWithdraw() external {
        pause = true;
    }

    function resumeWithdraw() external {
        pause = false;
    }

    function getBalance() public view returns (uint) {
        return users[msg.sender].balance;
    }
}
