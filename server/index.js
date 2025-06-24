const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const newsRoutes = require('./routes/newsRoutes');
app.use('/api', newsRoutes); 

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);

// DB connection
connectDB();

// ✅ Add this route
app.get("/api", (req, res) => {
  res.send("API is running and connected to MongoDB");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
