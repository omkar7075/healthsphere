// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ConsultationContract {
    struct Consultation {
        uint256 id;
        string doctorName;
        string patientName;
        string specialty;
        string consultationDate;
        string consultationTime;
    }

    mapping(uint256 => Consultation) public consultations;
    uint256 public consultationCount;

    event ConsultationStored(uint256 id, string doctorName, string patientName);

    function storeConsultation(
        string memory _doctorName,
        string memory _patientName,
        string memory _specialty,
        string memory _date,
        string memory _time
    ) public {
        consultationCount++;
        consultations[consultationCount] = Consultation(consultationCount, _doctorName, _patientName, _specialty, _date, _time);
        emit ConsultationStored(consultationCount, _doctorName, _patientName);
    }
}
