const express = require("express");
const router = express.Router();
const Article = require("../models/Article");
const { addArticleOnBlockchain, deleteArticleOnBlockchain } = require("../utils/HealthArticlesBlockchain");

// Get all articles from MongoDB
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch articles." });
  }
});

// Add a new article with blockchain
router.post("/", async (req, res) => {
  try {
    const { title, summary, image } = req.body;

    // Save to MongoDB
    const newArticle = new Article({ title, summary, image });
    const savedArticle = await newArticle.save();

    // Save to Blockchain
    const blockchainTx = await addArticleOnBlockchain(title, summary, image);

    res.status(201).json({ ...savedArticle._doc, blockchainTx });
  } catch (err) {
    res.status(500).json({ error: "Failed to add article" });
  }
});

// Delete an article with blockchain
router.delete("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: "Article not found" });

    // Remove from Blockchain
    const blockchainTx = await deleteArticleOnBlockchain(req.params.id);

    // Remove from MongoDB
    await Article.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Article deleted successfully", blockchainTx });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete article" });
  }
});

module.exports = router;
