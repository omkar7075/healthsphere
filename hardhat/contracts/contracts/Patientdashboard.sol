// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PatientDashboard {
    struct HealthRecord {
        string patientName;
        string diagnosis;
        string prescription;
        string notes;
        uint256 timestamp;
    }

    mapping(address => HealthRecord[]) private healthRecords;

    event RecordAdded(address indexed patient, string diagnosis, string prescription, string notes);

    function storeHealthRecord(string memory _patientName, string memory _diagnosis, string memory _prescription, string memory _notes) public {
        HealthRecord memory newRecord = HealthRecord({
            patientName: _patientName,
            diagnosis: _diagnosis,
            prescription: _prescription,
            notes: _notes,
            timestamp: block.timestamp
        });

        healthRecords[msg.sender].push(newRecord);

        emit RecordAdded(msg.sender, _diagnosis, _prescription, _notes);
    }

    function getHealthRecords() public view returns (HealthRecord[] memory) {
        return healthRecords[msg.sender];
    }
}
