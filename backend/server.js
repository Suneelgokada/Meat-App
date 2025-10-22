require('dotenv').config();
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const categoryRoutes = require('./routes/categoryRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
const publicCategoryRoutes = require('./routes/publicCategoryRoutes');
const productRoutes = require('./routes/productRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const superAdminRoutes = require('./routes/superAdminRoutes');
const { handleMulterError } = require('./middleware/uploadMiddleware');
const userProfileRoutes=require('./routes/userProfileRoutes');
 
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
 
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
 
app.use('/uploads', express.static('uploads'));
 
 
// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((error) => console.log(" MongoDB connection error:", error));
 
 
// Routes
app.use('/api/user',userRoutes );
app.use('/api/vendor',vendorRoutes);
app.use('/api/category',categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/public', publicCategoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/super-admin', superAdminRoutes);
app.use('/api/user-profile',userProfileRoutes);


 
// Error handling middleware for multer
app.use(handleMulterError);
 
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Meat App Backend</h1>");
});
 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});