// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DoctorDashboard {
    struct PatientRecord {
        string patientName;
        string diagnosis;
        string prescription;
        string notes;
        uint256 timestamp;
    }

    mapping(address => PatientRecord[]) private patientRecords;

    event RecordAdded(address indexed doctor, string patientName, string diagnosis, string prescription, string notes);

    function storeRecord(string memory _patientName, string memory _diagnosis, string memory _prescription, string memory _notes) public {
        PatientRecord memory newRecord = PatientRecord({
            patientName: _patientName,
            diagnosis: _diagnosis,
            prescription: _prescription,
            notes: _notes,
            timestamp: block.timestamp
        });

        patientRecords[msg.sender].push(newRecord);

        emit RecordAdded(msg.sender, _patientName, _diagnosis, _prescription, _notes);
    }

    function getRecords() public view returns (PatientRecord[] memory) {
        return patientRecords[msg.sender];
    }
}
