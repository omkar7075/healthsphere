//ABI

const AdminDashboardABI = [
    "function addUser(string name, string email, string role) public",
    "function addPatientRecord(string patientName, string diagnosis, string prescription) public",
    "function addLabBooking(string testName, string userEmail) public",
    "function getPatientRecords() public view returns (tuple(string patientName, string diagnosis, string prescription, uint256 timestamp)[])",
    "function getLabBookings() public view returns (tuple(string testName, string userEmail, uint256 timestamp)[])"
  ];

const AppointmentBookingABI = [
  "function bookAppointment(string name, string email, string phone, string doctor, string date, string time) public",
  "function cancelAppointment(uint256 id) public",
];

const AuthABI = [
  "function registerUser(string email, string password, string userType) public",
  "function authenticateUser(string email, string password) public view returns (bool)"
];

const ConsultationABI = [
  "function storeConsultation(string doctorName, string patientName, string specialty, string consultationDate, string consultationTime) public"
];

const DoctorDashboardABI = [
  "function storeRecord(string patientName, string diagnosis, string prescription, string notes) public",
  "function getRecords() public view returns (tuple(string patientName, string diagnosis, string prescription, string notes, uint256 timestamp)[])"
];

const HealthArticlesABI = [
  "function addArticle(string title, string summary, string image) public",
  "function deleteArticle(uint256 id) public",
  "function getArticle(uint256 id) public view returns (tuple(uint256 id, string title, string summary, string image, uint256 timestamp))"
];

const HealthRecordABI = [
  "function storeHealthRecord(string date, string doctor, string diagnosis, string prescription) public"
];

const LabBookingABI = [
  "function storeLabBooking(string name, string email, string phone, string testType, string appointmentDate, string appointmentTime) public"
];

const MedicineABI = [
  "function storeTransaction(string buyer, string medicineName, uint256 quantity, uint256 totalPrice) public"
];

const PatientABI = [
  "function storePatient(string name, uint256 age, string gender, string medicalHistory) public",
  "function getPatient(uint256 id) public view returns (string, uint256, string, string)"
];

const PatientDashboardABI = [
  "function storeHealthRecord(string patientName, string diagnosis, string prescription, string notes) public",
  "function getHealthRecords() public view returns (tuple(string patientName, string diagnosis, string prescription, string notes, uint256 timestamp)[])"
];

const PatientRecordABI = [
  "function storePatientRecord(string name, uint256 age, string gender, string medicalHistory, string lastVisit) public",
  "function getPatientRecord(uint256 id) public view returns (string, uint256, string, string, string)"
];

const PrescriptionABI = [
  "function storePrescription(string patientName, uint256 age, string symptoms, string diagnosis, string prescription, string notes) public",
  "function getPrescription(uint256 id) public view returns (string, uint256, string, string, string, string)"
];

const ScheduleEngineABI = [
  // Constructor
  "function addSchedule(string memory _task, string memory _time) public",
  "function updateSchedule(uint256 _scheduleId, string memory _newStatus) public",
  "function deleteSchedule(uint256 _scheduleId) public",
  "function getAllSchedules() public view returns (tuple(string task, string time, string status, address createdBy)[])"
];

const SymptomCheckerABI = [
  "function storeSymptom(string description, string diagnosis, string precautions, string treatment) public",
  "function getSymptoms() public view returns (tuple(string description, string diagnosis, string precautions, string treatment, uint256 timestamp)[])"
];

const TestBookingABI = [
  "function bookTest(string testName, uint256 price, string userId) public",
  "function getTestBooking(uint256 id) public view returns (string, uint256, string)"
];

const UserManageABI = [
  "function registerUser(string name, string email, string role, string password) public",
  "function updateUser(string name, string email, string role) public",
  "function deleteUser(string email) public",
  "function verifyUser(string email, string password) public view returns (bool)"
];


module.exports = {
  AdminDashboardABI,
  AppointmentBookingABI,
  AuthABI,
  ConsultationABI,
  DoctorDashboardABI,
  HealthArticlesABI,
  HealthRecordABI,
  LabBookingABI,
  MedicineABI,
  PatientABI,
  PatientDashboardABI,
  PatientRecordABI,
  PrescriptionABI,
  ScheduleEngineABI,
  SymptomCheckerABI,
  TestBookingABI,
  UserManageABI
  
};