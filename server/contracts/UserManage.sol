// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserManagement {
    struct User {
        string name;
        string email;
        string role;
        bytes32 passwordHash;
        bool exists;
    }

    mapping(address => User) private users;
    mapping(string => address) private emailToAddress;

    event UserRegistered(address indexed userAddress, string name, string email, string role);
    event UserUpdated(address indexed userAddress, string name, string email, string role);
    event UserDeleted(address indexed userAddress, string email);

    function registerUser(string memory _name, string memory _email, string memory _role, string memory _password) public {
        require(emailToAddress[_email] == address(0), "Email already registered");

        bytes32 passwordHash = keccak256(abi.encodePacked(_password));
        users[msg.sender] = User(_name, _email, _role, passwordHash, true);
        emailToAddress[_email] = msg.sender;

        emit UserRegistered(msg.sender, _name, _email, _role);
    }

    function updateUser(string memory _name, string memory _email, string memory _role) public {
        require(users[msg.sender].exists, "User does not exist");

        users[msg.sender].name = _name;
        users[msg.sender].role = _role;

        emit UserUpdated(msg.sender, _name, _email, _role);
    }

    function deleteUser(string memory _email) public {
        address userAddress = emailToAddress[_email];
        require(users[userAddress].exists, "User does not exist");

        delete users[userAddress];
        delete emailToAddress[_email];

        emit UserDeleted(userAddress, _email);
    }

    function verifyUser(string memory _email, string memory _password) public view returns (bool) {
        address userAddress = emailToAddress[_email];
        require(userAddress != address(0), "User not found");

        User memory user = users[userAddress];
        return user.passwordHash == keccak256(abi.encodePacked(_password));
    }
}
