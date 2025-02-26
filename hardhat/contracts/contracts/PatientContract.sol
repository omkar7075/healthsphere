// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PatientContract {
    struct PatientRecord {
        uint256 id;
        string name;
        uint256 age;
        string gender;
        string medicalHistory;
    }

    mapping(uint256 => PatientRecord) public patientRecords;
    uint256 public patientCount;

    event PatientAdded(uint256 id, string name, uint256 age, string gender, string medicalHistory);

    function storePatient(
        string memory _name,
        uint256 _age,
        string memory _gender,
        string memory _medicalHistory
    ) public {
        patientCount++;
        patientRecords[patientCount] = PatientRecord(patientCount, _name, _age, _gender, _medicalHistory);
        emit PatientAdded(patientCount, _name, _age, _gender, _medicalHistory);
    }

    function getPatient(uint256 _id) public view returns (string memory, uint256, string memory, string memory) {
        PatientRecord memory patient = patientRecords[_id];
        return (patient.name, patient.age, patient.gender, patient.medicalHistory);
    }
}
