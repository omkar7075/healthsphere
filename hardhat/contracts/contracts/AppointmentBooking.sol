// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AppointmentBooking {
    struct Appointment {
        string name;
        string email;
        string phone;
        string doctor;
        string date;
        string time;
        bool booked;
    }

    mapping(uint256 => Appointment) public appointments;
    uint256 public appointmentCount;

    event AppointmentBooked(uint256 id, string name, string doctor, string date, string time);
    event AppointmentCancelled(uint256 id);

    function bookAppointment(
        string memory _name,
        string memory _email,
        string memory _phone,
        string memory _doctor,
        string memory _date,
        string memory _time
    ) public {
        appointmentCount++;
        appointments[appointmentCount] = Appointment(_name, _email, _phone, _doctor, _date, _time, true);
        emit AppointmentBooked(appointmentCount, _name, _doctor, _date, _time);
    }

    function cancelAppointment(uint256 _id) public {
        require(appointments[_id].booked, "Appointment not found");
        appointments[_id].booked = false;
        emit AppointmentCancelled(_id);
    }

    function getAppointment(uint256 _id) public view returns (Appointment memory) {
        return appointments[_id];
    }
}
