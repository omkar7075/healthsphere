// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HealthRecordContract {
    struct HealthRecord {
        uint256 id;
        string date;
        string doctor;
        string diagnosis;
        string prescription;
    }

    mapping(uint256 => HealthRecord) public healthRecords;
    uint256 public recordCount;

    event HealthRecordStored(uint256 id, string doctor, string diagnosis);

    function storeHealthRecord(
        string memory _date,
        string memory _doctor,
        string memory _diagnosis,
        string memory _prescription
    ) public {
        recordCount++;
        healthRecords[recordCount] = HealthRecord(recordCount, _date, _doctor, _diagnosis, _prescription);
        emit HealthRecordStored(recordCount, _doctor, _diagnosis);
    }
}
