// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LabBookingContract {
    struct LabBooking {
        uint256 id;
        string name;
        string email;
        string phone;
        string testType;
        string appointmentDate;
        string appointmentTime;
    }

    mapping(uint256 => LabBooking) public bookings;
    uint256 public bookingCount;

    event LabBookingStored(uint256 id, string name, string testType);

    function storeLabBooking(
        string memory _name,
        string memory _email,
        string memory _phone,
        string memory _testType,
        string memory _appointmentDate,
        string memory _appointmentTime
    ) public {
        bookingCount++;
        bookings[bookingCount] = LabBooking(
            bookingCount,
            _name,
            _email,
            _phone,
            _testType,
            _appointmentDate,
            _appointmentTime
        );
        emit LabBookingStored(bookingCount, _name, _testType);
    }
}
