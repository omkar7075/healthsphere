// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract ScheduleEngine {
    struct Schedule {
        string task;
        string time;
        string status;
        address createdBy;
    }

    Schedule[] public schedules;
    mapping(uint256 => address) public scheduleOwners;
    
    event ScheduleCreated(uint256 indexed scheduleId, string task, string time, string status, address createdBy);
    event ScheduleUpdated(uint256 indexed scheduleId, string newStatus);
    event ScheduleDeleted(uint256 indexed scheduleId);

    function addSchedule(string memory _task, string memory _time) public {
        schedules.push(Schedule(_task, _time, "Pending", msg.sender));
        uint256 scheduleId = schedules.length - 1;
        scheduleOwners[scheduleId] = msg.sender;
        emit ScheduleCreated(scheduleId, _task, _time, "Pending", msg.sender);
    }

    function updateSchedule(uint256 _scheduleId, string memory _newStatus) public {
        require(scheduleOwners[_scheduleId] == msg.sender, "Unauthorized");
        schedules[_scheduleId].status = _newStatus;
        emit ScheduleUpdated(_scheduleId, _newStatus);
    }

    function deleteSchedule(uint256 _scheduleId) public {
        require(scheduleOwners[_scheduleId] == msg.sender, "Unauthorized");
        delete schedules[_scheduleId];
        emit ScheduleDeleted(_scheduleId);
    }

    function getAllSchedules() public view returns (Schedule[] memory) {
        return schedules;
    }
}
