const abi = [
    "function addUser(string name, string email, string role) public",
    "function addPatientRecord(string patientName, string diagnosis, string prescription) public",
    "function addLabBooking(string testName, string userEmail) public",
    "function getPatientRecords() public view returns (tuple(string patientName, string diagnosis, string prescription, uint256 timestamp)[])",
    "function getLabBookings() public view returns (tuple(string testName, string userEmail, uint256 timestamp)[])"
  ];
const abi = [
  "function bookAppointment(string name, string email, string phone, string doctor, string date, string time) public",
  "function cancelAppointment(uint256 id) public",
];

