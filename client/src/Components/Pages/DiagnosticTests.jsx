import { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/DiagnosticTests.css";

const DiagnosticTests = () => {
  const [search, setSearch] = useState("");
  const [selectedTests, setSelectedTests] = useState([]);
  const [availableTests, setAvailableTests] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/test-bookings");
        setAvailableTests(response.data);
      } catch (err) {
        console.error("Error fetching tests:", err.message);
        setErrorMessage("Failed to fetch tests.");
      }
    };

    fetchTests();
  }, []);

  const handleSearchChange = (e) => setSearch(e.target.value);

  const addTest = async (test) => {
    if (!selectedTests.find((item) => item._id === test._id)) {
      try {
        const response = await axios.post("/api/test-bookings", test);
        setSelectedTests((prev) => [...prev, response.data]);
        setSuccessMessage("Test added successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (err) {
        setErrorMessage("Failed to add test.");
      }
    }
  };

  const removeTest = async (id) => {
    try {
      await axios.delete(`/api/test-bookings/${id}`);
      setSelectedTests((prev) => prev.filter((item) => item._id !== id));
      setSuccessMessage("Test removed successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setErrorMessage("Failed to remove test.");
    }
  };

  const totalCost = selectedTests.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="diagnostic-container">
      <h1 className="page-title">Diagnostic Tests & Lab Booking</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for tests..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <div className="tests-list">
        {availableTests
          .filter((test) =>
            test.testName.toLowerCase().includes(search.toLowerCase())
          )
          .map((test) => (
            <div key={test._id} className="test-card">
              <h3>{test.testName}</h3>
              <p>₹{test.price}</p>
              <button onClick={() => addTest(test)}>Add to Booking</button>
            </div>
          ))}
      </div>
      <div className="booking-section">
        <h2>Your Booking</h2>
        {selectedTests.length > 0 ? (
          <div>
            <ul>
              {selectedTests.map((test) => (
                <li key={test._id}>
                  {test.testName} - ₹{test.price}
                  <button
                    className="remove-button"
                    onClick={() => removeTest(test._id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <p className="total-cost">Total: ₹{totalCost}</p>
            <button className="confirm-button">Confirm Booking</button>
          </div>
        ) : (
          <p>No tests selected.</p>
        )}
      </div>
    </div>
  );
};

export default DiagnosticTests;
