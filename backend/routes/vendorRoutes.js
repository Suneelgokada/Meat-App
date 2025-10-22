
// const express = require('express');
// const router = express.Router();
// const adminController = require('../controllers/vendorController');
// const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

// // PUBLIC ROUTES
// router.post('/register', adminController.registerAdmin);
// router.post('/login', adminController.loginAdmin);
// router.post('/send-reset-otp', adminController.sendResetOTP);
// router.post('/verify-reset-otp', adminController.verifyResetOTP);
// router.post('/reset-password', adminController.resetPassword);

// // PROTECTED ROUTES (Example - can add more admin-specific routes here)
// // router.get('/profile', verifyToken, verifyAdmin, authMiddleware.getAdminProfile);

// module.exports = router;
// THI SIS CHNAGE FROM ADMIJ TO VENDOR 


const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const { verifyToken, verifyVendor } = require('../middleware/authMiddleware');


// Vendor Login
router.post('/login', vendorController.loginVendor);

// Forgot Password Flow
router.post('/send-reset-otp', vendorController.sendResetOTP);
router.post('/verify-reset-otp', vendorController.verifyResetOTP);
router.post('/reset-password', vendorController.resetPassword);

// ============================================
// PROTECTED ROUTES (Vendor only - requires authentication)
// ============================================

// Vendor Profile
router.get('/profile', verifyToken, verifyVendor, vendorController.getVendorProfile);
router.put('/profile', verifyToken, verifyVendor, vendorController.updateVendorProfile);

// Change Password
router.put('/change-password', verifyToken, verifyVendor, vendorController.changePassword);

module.exports = router;