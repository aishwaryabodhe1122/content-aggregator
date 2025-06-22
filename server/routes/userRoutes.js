const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Auth middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// PUT /api/user/preferences
router.put("/preferences", auth, async (req, res) => {
  const { category } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user.preferences.includes(category)) {
      user.preferences.push(category);
      await user.save();
    }
    res.json(user.preferences);
  } catch (err) {
    res.status(500).json({ message: "Error updating preferences" });
  }
});

// GET /api/user/bookmarks
router.get("/bookmarks", auth, async (req, res) => {
    const user = await User.findById(req.userId);
    res.json(user.bookmarks);
  });
  
  // POST /api/user/bookmarks
  router.post("/bookmarks", auth, async (req, res) => {
    const article = req.body;
    const user = await User.findById(req.userId);
  
    const alreadyExists = user.bookmarks.some(b => b.url === article.url);
    if (!alreadyExists) {
      user.bookmarks.push(article);
      await user.save();
    }
  
    res.json(user.bookmarks);
  });
  
  // DELETE /api/user/bookmarks
  router.delete("/bookmarks", auth, async (req, res) => {
    const { url } = req.body;
    const user = await User.findById(req.userId);
  
    user.bookmarks = user.bookmarks.filter(b => b.url !== url);
    await user.save();
  
    res.json(user.bookmarks);
  });
  

module.exports = router;
