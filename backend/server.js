require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userProfileRoutes = require('./routes/userProfileRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((error) => console.log("MongoDB connection error:", error));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/userprofile',userProfileRoutes);
// Mount userProfileRoutes directly at /api

// Test route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Meat App Backend</h1>");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
