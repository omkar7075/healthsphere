// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SymptomStorage {
    struct SymptomRecord {
        string description;
        string diagnosis;
        string precautions;
        string treatment;
        uint256 timestamp;
    }

    mapping(address => SymptomRecord[]) private userRecords;

    event SymptomRecorded(address indexed user, string description, string diagnosis, string precautions, string treatment);

    function storeSymptom(string memory _description, string memory _diagnosis, string memory _precautions, string memory _treatment) public {
        SymptomRecord memory newRecord = SymptomRecord({
            description: _description,
            diagnosis: _diagnosis,
            precautions: _precautions,
            treatment: _treatment,
            timestamp: block.timestamp
        });

        userRecords[msg.sender].push(newRecord);

        emit SymptomRecorded(msg.sender, _description, _diagnosis, _precautions, _treatment);
    }

    function getSymptoms() public view returns (SymptomRecord[] memory) {
        return userRecords[msg.sender];
    }
}
