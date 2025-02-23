// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SchedulingEngine {
    struct Schedule {
        string task;
        string time;
        string status;
    }

    mapping(uint256 => Schedule) public schedules;
    uint256 public scheduleCount;

    event ScheduleAdded(uint256 scheduleId, string task, string time, string status);
    event ScheduleUpdated(uint256 scheduleId, string status);
    event ScheduleDeleted(uint256 scheduleId);

    function addSchedule(string memory _task, string memory _time) public {
        scheduleCount++;
        schedules[scheduleCount] = Schedule(_task, _time, "Pending");
        emit ScheduleAdded(scheduleCount, _task, _time, "Pending");
    }

    function updateSchedule(uint256 _id, string memory _status) public {
        require(_id > 0 && _id <= scheduleCount, "Schedule does not exist.");
        schedules[_id].status = _status;
        emit ScheduleUpdated(_id, _status);
    }

    function deleteSchedule(uint256 _id) public {
        require(_id > 0 && _id <= scheduleCount, "Schedule does not exist.");
        delete schedules[_id];
        emit ScheduleDeleted(_id);
    }
}
