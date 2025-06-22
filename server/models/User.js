const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferences: [String], // ['technology', 'sports']
  bookmarks: [
    {
      title: String,
      description: String,
      url: String,
      urlToImage: String,
      source: Object,
      publishedAt: String,
    }
  ],
  
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
