import React, { useState } from "react";
import axios from "axios";
import "../CSS/WebScraper.css";

const WebScraper = () => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setData(null);

    try {
      const response = await axios.post("/api/scrape", { url });
      setData(response.data);
    } catch (err) {
      setError("Failed to scrape the website. Please check the URL.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scraper-container">
      <h2>Web Scraper</h2>
      <form className="scraper-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="url">Enter Website URL</label>
          <input
            type="url"
            id="url"
            name="url"
            placeholder="https://example.com"
            value={url}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="scraper-button" disabled={loading}>
          {loading ? "Scraping..." : "Scrape Website"}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {data && (
        <div className="scraped-data">
          <h3>Scraped Content:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default WebScraper;
