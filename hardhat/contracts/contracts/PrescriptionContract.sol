// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PrescriptionContract {
    struct Prescription {
        uint256 id;
        string patientName;
        uint256 age;
        string symptoms;
        string diagnosis;
        string prescription;
        string notes;
    }

    mapping(uint256 => Prescription) public prescriptions;
    uint256 public prescriptionCount;

    event PrescriptionAdded(uint256 id, string patientName, string diagnosis, string prescription);

    function storePrescription(
        string memory _patientName,
        uint256 _age,
        string memory _symptoms,
        string memory _diagnosis,
        string memory _prescription,
        string memory _notes
    ) public {
        prescriptionCount++;
        prescriptions[prescriptionCount] = Prescription(
            prescriptionCount,
            _patientName,
            _age,
            _symptoms,
            _diagnosis,
            _prescription,
            _notes
        );
        emit PrescriptionAdded(prescriptionCount, _patientName, _diagnosis, _prescription);
    }

    function getPrescription(uint256 _id) public view returns (
        string memory,
        uint256,
        string memory,
        string memory,
        string memory,
        string memory
    ) {
        Prescription memory prescription = prescriptions[_id];
        return (
            prescription.patientName,
            prescription.age,
            prescription.symptoms,
            prescription.diagnosis,
            prescription.prescription,
            prescription.notes
        );
    }
}
