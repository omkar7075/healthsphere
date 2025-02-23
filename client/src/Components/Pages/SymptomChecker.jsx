import { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/SymptomChecker.css";

const SymptomChecker = () => {
  const [textInput, setTextInput] = useState("");
  const [imageInput, setImageInput] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [symptomHistory, setSymptomHistory] = useState([]); // Ensure it's initialized as an array

  useEffect(() => {
    const fetchSymptomHistory = async () => {
      try {
        const res = await axios.get("https://healthsphere-ln4c.onrender.com/api/symptom-checker");
        // Validate the response to ensure it's an array
        if (Array.isArray(res.data)) {
          setSymptomHistory(res.data);
        } else {
          throw new Error("Invalid data format received from the server.");
        }
      } catch (error) {
        console.error("Error fetching symptom history:", error.message);
      }
    };

    fetchSymptomHistory();
  }, []);

  const handleTextInputChange = (e) => setTextInput(e.target.value);

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageInput(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse(null);
    setLoading(true);

    const formData = new FormData();
    if (textInput) {
      formData.append("description", textInput);
    }
    if (imageInput) {
      formData.append("image", imageInput);
    }

    try {
      const res = await axios.post("https://healthsphere-ln4c.onrender.com/api/symptom-checker", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResponse(res.data);

      // Add the new response to the symptom history
      setSymptomHistory((prev) => [res.data, ...prev]);
    } catch (error) {
      console.error("Error:", error.message);
      setResponse({ error: "Failed to analyze the input. Try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="symptom-checker-container">
      <h1>Symptom Checker</h1>
      <form className="symptom-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="textInput">Describe Your Symptoms</label>
          <textarea
            id="textInput"
            placeholder="Describe your symptoms here..."
            value={textInput}
            onChange={handleTextInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageInput">Upload an Image (optional)</label>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Analyzing..." : "Submit"}
        </button>
      </form>
      {response && (
        <div className="response-section">
          {response.error ? (
            <p className="error-message">{response.error}</p>
          ) : (
            <div className="response-data">
              <h3>Analysis Result</h3>
              <p>
                <strong>Diagnosis:</strong> {response.diagnosis}
              </p>
              <p>
                <strong>Precautions:</strong> {response.precautions}
              </p>
              <p>
                <strong>Treatment:</strong> {response.treatment}
              </p>
            </div>
          )}
        </div>
      )}
      <div className="history-section">
        <h3>Symptom History</h3>
        {symptomHistory.length > 0 ? (
          symptomHistory.map((record) => (
            <div key={record._id} className="history-item">
              <p>
                <strong>Description:</strong> {record.description}
              </p>
              <p>
                <strong>Diagnosis:</strong> {record.diagnosis}
              </p>
              <p>
                <strong>Precautions:</strong> {record.precautions}
              </p>
              <p>
                <strong>Treatment:</strong> {record.treatment}
              </p>
            </div>
          ))
        ) : (
          <p>No symptom history available.</p>
        )}
      </div>
    </div>
  );
};

export default SymptomChecker;
