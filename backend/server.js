<<<<<<< HEAD
=======
require('dotenv').config();
>>>>>>> e8b3c264054ed86ddf261e0d28917fe6adc84314
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
<<<<<<< HEAD
=======
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
>>>>>>> e8b3c264054ed86ddf261e0d28917fe6adc84314


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


<<<<<<< HEAD

=======
// Routes
app.use('/api/user',userRoutes );
app.use('/api/admin',adminRoutes);
>>>>>>> e8b3c264054ed86ddf261e0d28917fe6adc84314



app.get("/", (req, res) => {
  res.send("<h1>Welcome to Meat App Backend</h1>");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
