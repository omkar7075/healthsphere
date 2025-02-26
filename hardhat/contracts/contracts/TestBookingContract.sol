// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TestBookingContract {
    struct TestBooking {
        uint256 id;
        string testName;
        uint256 price;
        string userId;
    }

    mapping(uint256 => TestBooking) public testBookings;
    uint256 public testBookingCount;

    event TestBooked(uint256 id, string testName, uint256 price, string userId);

    function bookTest(
        string memory _testName,
        uint256 _price,
        string memory _userId
    ) public {
        testBookingCount++;
        testBookings[testBookingCount] = TestBooking(testBookingCount, _testName, _price, _userId);
        emit TestBooked(testBookingCount, _testName, _price, _userId);
    }

    function getTestBooking(uint256 _id) public view returns (
        string memory,
        uint256,
        string memory
    ) {
        TestBooking memory booking = testBookings[_id];
        return (booking.testName, booking.price, booking.userId);
    }
}
