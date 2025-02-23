import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/HealthWellness.css";

const HealthWellness = () => {
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({ title: "", summary: "", image: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [blockchainTx, setBlockchainTx] = useState("");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/articles");
      if (Array.isArray(response.data)) {
        setArticles(response.data);
      } else {
        setErrorMessage("Fetched data is not in the expected format.");
      }
    } catch (err) {
      setErrorMessage("Failed to fetch articles.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArticle((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddArticle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/articles", newArticle);
      setArticles((prev) => [...prev, response.data]);
      setSuccessMessage("Article added successfully!");
      setBlockchainTx(response.data.blockchainTx);
      setNewArticle({ title: "", summary: "", image: "" });
    } catch (err) {
      setErrorMessage("Failed to add article.");
    }
  };

  return (
    <div className="health-wellness-container">
      <h1>Health and Wellness Content</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {blockchainTx && <p className="blockchain-tx">Blockchain Tx: {blockchainTx}</p>}
      <div className="articles-container">
        {articles.map((article) => (
          <div className="article-card" key={article._id}>
            <img src={article.image} alt={article.title} />
            <h3>{article.title}</h3>
            <p>{article.summary}</p>
          </div>
        ))}
      </div>
      <form className="add-article-form" onSubmit={handleAddArticle}>
        <input type="text" name="title" placeholder="Title" value={newArticle.title} onChange={handleInputChange} required />
        <textarea name="summary" placeholder="Summary" value={newArticle.summary} onChange={handleInputChange} required />
        <input type="text" name="image" placeholder="Image URL" value={newArticle.image} onChange={handleInputChange} required />
        <button type="submit">Add Article</button>
      </form>
    </div>
  );
};

export default HealthWellness;
