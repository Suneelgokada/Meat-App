const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");


dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json()); 

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((error) => console.log(" MongoDB connection error:", error));






app.get("/", (req, res) => {
  res.send("<h1>Welcome to Meat App Backend</h1>");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
