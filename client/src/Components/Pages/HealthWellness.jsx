import  { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/HealthWellness.css";

const HealthWellness = () => {
  const [articles, setArticles] = useState([]); // Initialize articles as an empty array
  const [newArticle, setNewArticle] = useState({
    title: "",
    summary: "",
    image: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchArticles = async () => {
    try {
      const response = await axios.get("https://healthsphere-ln4c.onrender.com/api/articles");
      // Ensure the response is an array before setting it
      if (Array.isArray(response.data)) {
        setArticles(response.data);
      } else {
        setErrorMessage("Fetched data is not in the expected format.");
      }
    } catch (err) {
      setErrorMessage("Failed to fetch articles.");
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArticle((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddArticle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://healthsphere-ln4c.onrender.com/api/articles", newArticle);
      setArticles((prev) => [...prev, response.data]);
      setSuccessMessage("Article added successfully!");
      setNewArticle({ title: "", summary: "", image: "" });
    } catch (err) {
      setErrorMessage("Failed to add article.");
    }
  };

  const handleDeleteArticle = async (id) => {
    try {
      await axios.delete(`https://healthsphere-ln4c.onrender.com/api/articles/${id}`);
      setArticles((prev) => prev.filter((article) => article._id !== id));
      setSuccessMessage("Article deleted successfully!");
    } catch (err) {
      setErrorMessage("Failed to delete article.");
    }
  };

  return (
    <div className="health-wellness-container">
      <h1>Health and Wellness Content</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <div className="articles-container">
        {Array.isArray(articles) && articles.length > 0 ? (
          articles.map((article) => (
            <div className="article-card" key={article._id}>
              <img src={article.image} alt={article.title} />
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
              <button
                className="delete-button"
                onClick={() => handleDeleteArticle(article._id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No articles available.</p>
        )}
      </div>
      <div className="add-article-section">
        <h2>Add New Article</h2>
        <form className="add-article-form" onSubmit={handleAddArticle}>
          <input
            type="text"
            name="title"
            value={newArticle.title}
            onChange={handleInputChange}
            placeholder="Article Title"
            required
          />
          <textarea
            name="summary"
            value={newArticle.summary}
            onChange={handleInputChange}
            placeholder="Article Summary"
            required
          />
          <input
            type="text"
            name="image"
            value={newArticle.image}
            onChange={handleInputChange}
            placeholder="Image URL"
            required
          />
          <button type="submit" className="add-article-button">
            Add Article
          </button>
        </form>
      </div>
    </div>
  );
};

export default HealthWellness;
