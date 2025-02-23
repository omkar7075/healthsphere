// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AuthContract {
    struct User {
        string email;
        bytes32 passwordHash;
        string userType;
    }

    mapping(address => User) private users;
    mapping(string => address) private emailToAddress;

    event UserRegistered(address indexed userAddress, string email, string userType);
    event UserAuthenticated(address indexed userAddress, string email);

    function registerUser(string memory _email, string memory _password, string memory _userType) public {
        require(emailToAddress[_email] == address(0), "Email already registered");

        bytes32 passwordHash = keccak256(abi.encodePacked(_password));
        users[msg.sender] = User(_email, passwordHash, _userType);
        emailToAddress[_email] = msg.sender;

        emit UserRegistered(msg.sender, _email, _userType);
    }

    function authenticateUser(string memory _email, string memory _password) public view returns (bool) {
        address userAddress = emailToAddress[_email];
        require(userAddress != address(0), "User not found");

        User memory user = users[userAddress];
        return user.passwordHash == keccak256(abi.encodePacked(_password));
    }
}
