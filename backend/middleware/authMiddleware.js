const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'Token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

const verifyAdmin = (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Access denied' });
  }
};

const verifyUser = (req, res, next) => {
  try {
    if (req.user.role !== 'user') {
      return res.status(403).json({ success: false, message: 'User access required' });
    }
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Access denied' });
  }
};

module.exports = { verifyToken, verifyAdmin, verifyUser };
