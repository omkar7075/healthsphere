import { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/DiagnosticTests.css";

const DiagnosticTests = () => {
  const [availableTests, setAvailableTests] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [blockchainTest, setBlockchainTest] = useState(null);
  const [search, setSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/test-bookings");
        if (Array.isArray(response.data)) {
          setAvailableTests(response.data);
        } else {
          throw new Error("Invalid data format received from the server.");
        }
      } catch (err) {
        alert("Failed to fetch test bookings.");
      }
    };

    fetchTests();
  }, []);

  const fetchTestFromBlockchain = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/test-bookings/blockchain/${id}`);
      setBlockchainTest(response.data);
    } catch (err) {
      alert("Failed to fetch blockchain test booking data.");
    }
  };

  const addTest = async (test) => {
    if (!selectedTests.find((item) => item._id === test._id)) {
      try {
        const response = await axios.post("http://localhost:5000/api/test-bookings", test);
        setSelectedTests((prev) => [...prev, response.data.savedBooking]);
        alert(`Test booked successfully! Blockchain Tx: ${response.data.blockchainTx}`);
      } catch (err) {
        alert("Failed to book test.");
      }
    }
  };

  return (
    <div className="diagnostic-container">
      <h1 className="page-title">Diagnostic Tests & Lab Booking</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for tests..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="tests-list">
        {availableTests
          .filter((test) => test.testName.toLowerCase().includes(search.toLowerCase()))
          .map((test) => (
            <div key={test._id} className="test-card">
              <h3>{test.testName}</h3>
              <p>₹{test.price}</p>
              <button onClick={() => addTest(test)}>Book Test</button>
            </div>
          ))}
      </div>
      <div className="blockchain-section">
        <h2>Verify Test Booking on Blockchain</h2>
        <input
          type="number"
          placeholder="Enter Test ID"
          onChange={(e) => fetchTestFromBlockchain(e.target.value)}
        />
        {blockchainTest && (
          <div className="blockchain-details">
            <p><strong>Test Name:</strong> {blockchainTest[0]}</p>
            <p><strong>Price:</strong> ₹{blockchainTest[1]}</p>
            <p><strong>User ID:</strong> {blockchainTest[2]}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnosticTests;
