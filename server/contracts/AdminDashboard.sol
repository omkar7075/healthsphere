// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AdminDashboard {
    struct User {
        string name;
        string email;
        string role;
    }

    struct PatientRecord {
        string patientName;
        string diagnosis;
        string prescription;
        uint256 timestamp;
    }

    struct LabBooking {
        string testName;
        string userEmail;
        uint256 timestamp;
    }

    mapping(address => User) public users;
    PatientRecord[] public patientRecords;
    LabBooking[] public labBookings;

    event UserAdded(address indexed userAddress, string name, string email, string role);
    event PatientRecordAdded(string patientName, string diagnosis, string prescription);
    event LabBookingAdded(string testName, string userEmail);

    function addUser(string memory _name, string memory _email, string memory _role) public {
        users[msg.sender] = User(_name, _email, _role);
        emit UserAdded(msg.sender, _name, _email, _role);
    }

    function addPatientRecord(string memory _patientName, string memory _diagnosis, string memory _prescription) public {
        patientRecords.push(PatientRecord(_patientName, _diagnosis, _prescription, block.timestamp));
        emit PatientRecordAdded(_patientName, _diagnosis, _prescription);
    }

    function addLabBooking(string memory _testName, string memory _userEmail) public {
        labBookings.push(LabBooking(_testName, _userEmail, block.timestamp));
        emit LabBookingAdded(_testName, _userEmail);
    }

    function getPatientRecords() public view returns (PatientRecord[] memory) {
        return patientRecords;
    }

    function getLabBookings() public view returns (LabBooking[] memory) {
        return labBookings;
    }
}
