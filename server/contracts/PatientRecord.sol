// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PatientRecordContract {
    struct PatientRecord {
        uint256 id;
        string name;
        uint256 age;
        string gender;
        string medicalHistory;
        string lastVisit;
    }

    mapping(uint256 => PatientRecord) public patientRecords;
    uint256 public patientCount;

    event PatientAdded(uint256 id, string name, uint256 age, string gender, string medicalHistory, string lastVisit);

    function storePatientRecord(
        string memory _name,
        uint256 _age,
        string memory _gender,
        string memory _medicalHistory,
        string memory _lastVisit
    ) public {
        patientCount++;
        patientRecords[patientCount] = PatientRecord(patientCount, _name, _age, _gender, _medicalHistory, _lastVisit);
        emit PatientAdded(patientCount, _name, _age, _gender, _medicalHistory, _lastVisit);
    }

    function getPatientRecord(uint256 _id) public view returns (string memory, uint256, string memory, string memory, string memory) {
        PatientRecord memory patient = patientRecords[_id];
        return (patient.name, patient.age, patient.gender, patient.medicalHistory, patient.lastVisit);
    }
}
