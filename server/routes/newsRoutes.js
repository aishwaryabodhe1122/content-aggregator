const express = require('express');
const axios = require('axios');
const router = express.Router();

const NEWS_API_KEY = process.env.NEWS_API_KEY;

router.get('/', async (req, res) => {
  const { category = 'technology' } = req.query;

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${category}&sortBy=publishedAt&language=en&pageSize=10&apiKey=${NEWS_API_KEY}`
    );

    // console.log('NewsAPI response:', response.data); // Optional logging
    res.json(response.data.articles);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ message: 'Error fetching news' });
  }
});

router.get('/news', async (req, res) => {
  const category = req.query.category || 'general';
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?category=${category}&language=en&pageSize=10&apiKey=${NEWS_API_KEY}`
    );
    res.json(response.data.articles);
  } catch (error) {
    console.error("NewsAPI error:", error.message);
    res.status(500).json({ message: "Failed to fetch news" });
  }
});

router.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ message: "Missing query" });

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&language=en&pageSize=10&apiKey=${NEWS_API_KEY}`
    );
    res.json(response.data.articles);
  } catch (error) {
    console.error("Search error:", error.message);
    res.status(500).json({ message: "Search failed" });
  }
});


module.exports = router;
